import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const BooksIssued = () => {
    const [books, setBooks] = useState([]) 

    const fetchBooks = async () => {
        const url = `http://localhost:3001/api/issues`

        try {
            const response = await axios.get(url)
            setBooks(response.data)
            console.log(books)
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className="h-screen w-screen flex">
            <Sidebar />
            <div className="h-full w-4/5 bg-[#A1EEC5] flex flex-col">
            <InventoryTopBar />
            {books.length > 0 ? (
                    <div className="w-full">
                        {books.map((book) => (
                            <div key={book.id} className="p-4 mb-2 rounded shadow">
                                <h3 className="text-lg font-bold">{book.book_id}</h3>
                                <p className="text-gray-700">Student ID: {book.student_id}</p>
                                <p className="text-gray-700">Date of Return: {book.date_of_return.split('T')[0]}</p>
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
