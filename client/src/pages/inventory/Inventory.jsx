import React from "react";
import Sidebar from "../../components/Sidebar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const Inventory = () => {
    const [books, setBooks] = useState([]) 

    const fetchBooks = async () => {
        const url = `http://localhost:3001/api/books`

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
            <div className="h-full w-4/5 bg-[#A1EEC5] flex justify-center">
            {books.length > 0 ? (
                    <div className="w-full">
                        {books.map((book) => (
                            <div key={book.id} className="p-4 mb-2 rounded shadow">
                                <h3 className="text-lg font-bold">{book.name}</h3>
                                <p className="text-gray-700">Author: {book.author}</p>
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

export default Inventory;
