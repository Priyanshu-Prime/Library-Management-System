import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import BookCard from "../../components/BookCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const PORT = import.meta.env.VITE_SERVER_PORT;

const Inventory = () => {
  interface Books {
    id: string;
    name: string;
    subject: string;
    author: string;
    publication: string;
    image: string;
  }
  const [books, setBooks] = useState<Books[]>([]);

  const fetchBooks = async (searchParams?: string) => {
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

  const handleSearch = (searchTerm?: string) => {
    fetchBooks(searchTerm);
  };

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="h-full w-4/5 bg-[#A1EEC5] flex flex-col overflow-y-auto">
        <InventoryTopBar onSearch={handleSearch} />
        {books.length > 0 ? (
          <div className="w-full p-10 flex flex-wrap justify-between">
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
