import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import BookCard from "../../components/BookCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const PORT = import.meta.env.VITE_SERVER_PORT;

const Inventory = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async (searchParams) => {
    let url;
    if (searchParams) {
      url = `http://localhost:${PORT}/api/books/filter/${searchParams}`;
    } else {
      console.log("No query passed");
      url = `http://localhost:${PORT}/api/books`;
    }

    try {
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.log("Error in Inventory fetchbook");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    fetchBooks(searchTerm);
  };

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="h-full w-4/5 bg-[#F0F7F4] flex flex-col overflow-y-auto">
        <InventoryTopBar onSearch={handleSearch} />
        {books.length > 0 ? (
          <div className="w-full px-10 py-8 flex flex-wrap ">
            {books.map((book) => (
              <BookCard
                name={book.name}
                author={book.author}
                image={book.image}
              />
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
