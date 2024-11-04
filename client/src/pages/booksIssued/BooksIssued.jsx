import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import returnImg from '../../assets/go-back-arrow.png'

const PORT = import.meta.env.VITE_SERVER_PORT;

const BooksIssued = () => {
    const [books, setBooks] = useState([]) 

    const fetchBooks = async () => {
        const url = `http://localhost:${PORT}/api/issues`

        try {
            const response = await axios.get(url)
            setBooks(response.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    const unissueBook = async(book_id) => {
        try {
            const response = await axios.delete(`http://localhost:${PORT}/api/issues/delete/${book_id}`)
            console.log(response.data)

            await fetchBooks()
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className="h-full w-full flex">
            <Sidebar />
            <div className="h-full w-4/5 bg-[#A1EEC5] flex flex-col overflow-y-auto">
            <InventoryTopBar />
            {books.length > 0 ? (
                    <div className="h-5/6 w-full">
                        {books.map((book) => (
                            <div key={book.book_id} className="p-4 mb-2 rounded shadow flex">
                                <div className="w-4/5">
                                    <h3 className="text-lg font-bold">{book.book_id}</h3>
                                    <h3 className="text-lg font-bold">{book.title}</h3>
                                    <p className="text-gray-700">Student ID: {book.student_id}</p>
                                    <p className="text-gray-700">Student Name: {book.name}</p>
                                    <p className="text-gray-700">Date of Return: {book.date_of_return.split('T')[0]}</p>
                                </div>
                                <div onClick={() => {unissueBook(book.book_id)}} className="flex flex-col justify-center">
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
