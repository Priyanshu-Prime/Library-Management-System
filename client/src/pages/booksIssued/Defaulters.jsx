import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import returnImg from '../../assets/go-back-arrow.png'
import moment from 'moment'

const PORT = import.meta.env.VITE_ADDRESS;

const BooksIssued = () => {

    function titleCase(s) {
        return s.toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
    }

    const [books, setBooks] = useState([]) 

    const fetchBooks = async () => {
        const url = `http://${PORT}/api/issues/defaulters`

        try {
            const response = await axios.get(url)
            setBooks(response.data)
            console.log(response.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    const unissueBook = async(book_id) => {
        try {
            const response = await axios.patch(`http://${PORT}/api/issues/return/${book_id}`)
            console.log(response.data)

            await fetchBooks()
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBooks()
        console.log("refresh")
    }, [])

    return (
        <div className="h-full w-full flex">
            <Sidebar />
            <div className="h-full w-4/5 bg-[#F0F7F4] flex flex-col overflow-y-auto">
            <InventoryTopBar />
            {books.length > 0 ? (
                    <div className="h-5/6 w-full">
                        {books.map((book) => (
                            <div key={book.book_id} className="p-4 mb-2 rounded shadow flex">
                                <div className="w-4/5">
                                    <h3 className="text-lg font-bold">{book.book_id}</h3>
                                    <h3 className="text-lg font-bold">{book.title}</h3>
                                    <p className="text-gray-700">Student ID: {book.student_id}</p>
                                    <p className="text-gray-700">Student Name: {titleCase(book.student.name)}</p>
                                    <p className="text-gray-700">Date of Return: {moment(book.date_of_issue).format("DD-MM-YYYY")}</p>
                                </div>
                                <div onClick={() => {unissueBook(book.book_id)}} className="flex flex-col justify-center" style={{cursor: 'pointer'}}>
                                    <img src={returnImg} height={20} width={20} className="self-center" />
                                    <h3 className="self-center">Return</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No books available.</p>
                )}
            </div>
        </div>
    );
};

export default BooksIssued;
