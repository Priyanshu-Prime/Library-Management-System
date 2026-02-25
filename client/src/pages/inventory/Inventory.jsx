import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import BookCard from "../../components/BookCard";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api";
import IssueBook from "../../components/IssueBook";
import { FaPlus } from "react-icons/fa";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [showIssuePanel, setShowIssuePanel] = useState(false);

  const fetchBooks = async (searchParams) => {
    let url;
    if (searchParams) {
      url = `/books/filter/${searchParams}`;
    } else {
      console.log("No query passed");
      url = `/books`;
    }

    console.log(url)

    try {
      const response = await api.get(url);
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
    <div className="h-screen w-screen flex bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full relative">
        <InventoryTopBar onSearch={handleSearch} />
        
        <div className="flex-1 overflow-y-auto p-8">
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id || book.name}
                  id={book.id}
                  name={book.name}
                  author={book.author}
                  image={book.image}
                  available={book.available}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-xl">No books found.</p>
            </div>
          )}
        </div>

        {/* Floating Action Button for Issue Book */}
        <button 
          onClick={() => setShowIssuePanel(!showIssuePanel)}
          className="absolute bottom-8 right-8 bg-[#2274A5] text-white p-4 rounded-full shadow-lg hover:bg-[#1a5b82] transition-all duration-300 z-50 flex items-center gap-2"
          title="Issue Book"
        >
          <FaPlus className={`transition-transform duration-300 ${showIssuePanel ? 'rotate-45' : ''}`} />
          <span className="font-bold">{showIssuePanel ? 'Close' : 'Issue Book'}</span>
        </button>

        {/* Sliding Issue Panel */}
        <div className={`absolute top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${showIssuePanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full overflow-y-auto p-6 pt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Issue a Book</h2>
            <IssueBook />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Inventory;
