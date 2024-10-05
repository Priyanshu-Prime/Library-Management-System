import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import BookCard from "../../components/BookCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const port = import.meta.env.VITE_SERVER_PORT;
const Inventory = () => {
    const [books, setBooks] = useState([]) 

    const fetchBooks = async () => {
        const url = `http://localhost:${port}/api/books`

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
                    <div className="w-full p-10 flex flex-wrap justify-between">
                        {books.map((book) => (
                            <BookCard name={book.name} author={book.author} />
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
