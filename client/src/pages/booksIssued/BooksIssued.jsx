import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import api from "../../api";
import moment from "moment";
import { FaUndo } from "react-icons/fa";

const BooksIssued = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await api.get("/issues/unreturned");
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const unissueBook = async (book_id) => {
    const confirmUnissue = window.confirm(
      "Are you sure you want to return this book?"
    );
    if (!confirmUnissue) {
      return;
    }

    try {
      await api.patch(`/issues/return/${book_id}`);
      await fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerTerm) ||
        book.name.toLowerCase().includes(lowerTerm) ||
        book.book_id.toLowerCase().includes(lowerTerm) ||
        String(book.student_id).includes(lowerTerm)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  return (
    <div className="h-screen w-screen flex bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full relative">
        <InventoryTopBar onSearch={setSearchTerm} />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Issued Books</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                {filteredBooks.length} Active Issues
              </span>
            </div>
            
            {filteredBooks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                      <th className="p-4 font-semibold border-b">Book Info</th>
                      <th className="p-4 font-semibold border-b">Student Info</th>
                      <th className="p-4 font-semibold border-b">Issue Date</th>
                      <th className="p-4 font-semibold border-b">Return Date</th>
                      <th className="p-4 font-semibold border-b text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{book.title}</div>
                          <div className="text-xs text-gray-500">ID: {book.book_id}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{book.name}</div>
                          <div className="text-xs text-gray-500">ID: {book.student_id}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {moment(book.date_of_issue).format("DD-MM-YYYY")}
                        </td>
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            moment(book.date_of_return).isBefore(moment()) 
                              ? "bg-red-100 text-red-700" 
                              : "bg-green-100 text-green-700"
                          }`}>
                            {moment(book.date_of_return).format("DD-MM-YYYY")}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => unissueBook(book.book_id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors title='Return Book'"
                          >
                            <FaUndo />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">No issued books found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksIssued;
