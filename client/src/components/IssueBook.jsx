import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import moment from "moment";

const IssueBook = () => {
  const [bookQuery, setBookQuery] = useState("");
  const [studentQuery, setStudentQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [issueDate, setIssueDate] = useState(moment().format("YYYY-MM-DD"));
  const [returnDate, setReturnDate] = useState(moment().add(1, 'months').format("YYYY-MM-DD"));

  const bookTimeout = useRef();
  const studentTimeout = useRef();

  useEffect(() => {
    if (issueDate) {
      setReturnDate(moment(issueDate).add(1, 'months').format("YYYY-MM-DD"));
    }
  }, [issueDate]);

  useEffect(() => {
    clearTimeout(bookTimeout.current);
    if (bookQuery.trim()) {
      bookTimeout.current = setTimeout(() => {
        api
          .get(`/books/filter/${bookQuery}`)
          .then((res) => setBooks(res.data))
          .catch((err) => console.error(err));
      }, 300);
    } else {
      setBooks([]);
    }
  }, [bookQuery]);

  useEffect(() => {
    clearTimeout(studentTimeout.current);
    if (studentQuery.trim()) {
      studentTimeout.current = setTimeout(() => {
        api
          .get(`/students/filter/${studentQuery}`)
          .then((res) => setStudents(res.data))
          .catch((err) => console.error(err));
      }, 300);
    } else {
      setStudents([]);
    }
  }, [studentQuery]);

  const handleIssue = async () => {
    if (!selectedBook || !selectedStudent) {
      alert("Please select both book and student.");
      return;
    }

    try {
      const res = await api.post(`/issues`, {
        book_id: selectedBook.id,
        student_id: selectedStudent.roll_no,
        date_of_issue: issueDate,
        date_of_return: returnDate,
      });
      if (res.status === 201) {
        alert("Book issued successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Issue failed", error);
      alert("Failed to issue book.");
    }
  };

  const resetForm = () => {
    setBookQuery("");
    setStudentQuery("");
    setBooks([]);
    setStudents([]);
    setSelectedBook(null);
    setSelectedStudent(null);
    setIssueDate(moment().format("YYYY-MM-DD"));
  };

  return (
    <div className="space-y-6">
      {/* Book Search */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search Book</label>
        <input
          type="text"
          value={bookQuery}
          onChange={(e) => {
            setBookQuery(e.target.value);
            setSelectedBook(null);
          }}
          placeholder="Type book name..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2274A5] focus:border-transparent outline-none transition-all"
        />
        {books.length > 0 && !selectedBook && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
            {books.map((book) => (
              <li
                key={book.id}
                onClick={() => {
                  setSelectedBook(book);
                  setBookQuery(book.name);
                  setBooks([]);
                }}
                className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
              >
                <div className="font-medium text-gray-800">{book.name}</div>
                <div className="text-xs text-gray-500">{book.author}</div>
              </li>
            ))}
          </ul>
        )}
        {selectedBook && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex justify-between items-center">
            <span>Selected: <strong>{selectedBook.name}</strong></span>
            <button onClick={() => {setSelectedBook(null); setBookQuery('')}} className="text-green-600 hover:text-green-800 font-bold">✕</button>
          </div>
        )}
      </div>

      {/* Student Search */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search Student</label>
        <input
          type="text"
          value={studentQuery}
          onChange={(e) => {
            setStudentQuery(e.target.value);
            setSelectedStudent(null);
          }}
          placeholder="Type student name or ID..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2274A5] focus:border-transparent outline-none transition-all"
        />
        {students.length > 0 && !selectedStudent && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
            {students.map((student) => (
              <li
                key={student.roll_no}
                onClick={() => {
                  setSelectedStudent(student);
                  setStudentQuery(student.name);
                  setStudents([]);
                }}
                className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
              >
                <div className="font-medium text-gray-800">{student.name}</div>
                <div className="text-xs text-gray-500">ID: {student.roll_no}</div>
              </li>
            ))}
          </ul>
        )}
        {selectedStudent && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex justify-between items-center">
            <span>Selected: <strong>{selectedStudent.name}</strong></span>
            <button onClick={() => {setSelectedStudent(null); setStudentQuery('')}} className="text-green-600 hover:text-green-800 font-bold">✕</button>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2274A5] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2274A5] outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleIssue}
        disabled={!selectedBook || !selectedStudent}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-200 shadow-md ${
          selectedBook && selectedStudent
            ? "bg-[#2274A5] hover:bg-[#1a5b82] hover:shadow-lg transform hover:-translate-y-0.5"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Confirm Issue
      </button>
    </div>
  );
};

export default IssueBook;
