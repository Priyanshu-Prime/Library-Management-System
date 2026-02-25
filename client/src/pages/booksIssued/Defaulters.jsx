import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import api from "../../api";
import moment from "moment";
import { FaUndo, FaExclamationTriangle } from "react-icons/fa";

const Defaulters = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await api.get("/issues/defaulters");
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
        (book.title && book.title.toLowerCase().includes(lowerTerm)) ||
        (book.student && book.student.name && book.student.name.toLowerCase().includes(lowerTerm)) ||
        (book.book_id && book.book_id.toLowerCase().includes(lowerTerm)) ||
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
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-red-50">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-500 text-xl" />
                <h2 className="text-xl font-bold text-red-800">Defaulters List</h2>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                {filteredBooks.length} Overdue
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
                      <tr key={book.id} className="hover:bg-red-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{book.title || "Unknown Title"}</div>
                          <div className="text-xs text-gray-500">ID: {book.book_id}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{book.student?.name || "Unknown"}</div>
                          <div className="text-xs text-gray-500">ID: {book.student_id}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {moment(book.date_of_issue).format("DD-MM-YYYY")}
                        </td>
                        <td className="p-4 text-sm font-bold text-red-600">
                          {moment(book.date_of_return).format("DD-MM-YYYY")}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => unissueBook(book.book_id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors title='Return Book'"
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
                <p className="text-lg">No defaulters found. Great job!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Defaulters;
