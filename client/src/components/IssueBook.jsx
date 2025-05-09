import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PORT = import.meta.env.VITE_ADDRESS;

const IssueBook = () => {
  const [bookQuery, setBookQuery] = useState("");
  const [studentQuery, setStudentQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0]
  );

  const bookTimeout = useRef();
  const studentTimeout = useRef();

  useEffect(() => {
    clearTimeout(bookTimeout.current);
    if (bookQuery.trim()) {
      bookTimeout.current = setTimeout(() => {
        axios
          .get(`http://${PORT}/api/books/filter/${bookQuery}`)
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
        axios
          .get(`http://${PORT}/api/students/filter/${studentQuery}`)
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
      const res = await axios.post(`http://${PORT}/api/issues`, {
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
    setIssueDate(new Date().toISOString().split("T")[0]);
    setReturnDate(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Issue Book</h2>

      {/* Book Search */}
      <div className="mb-4 relative">
        <label className="block mb-1 font-medium">Search Book</label>
        <input
          type="text"
          value={bookQuery}
          onChange={(e) => {
            setBookQuery(e.target.value);
            setSelectedBook(null);
          }}
          className="w-full p-2 border rounded"
          placeholder="Enter book name or code"
        />
        {books.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
            {books.map((book) => (
              <li
                key={book.id}
                className="p-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setSelectedBook(book);
                  setBookQuery(`${book.name} (${book.id})`);
                  setBooks([]);
                }}
              >
                {book.name} ({book.id})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Student Search */}
      <div className="mb-4 relative">
        <label className="block mb-1 font-medium">Search Student</label>
        <input
          type="text"
          value={studentQuery}
          onChange={(e) => {
            setStudentQuery(e.target.value);
            setSelectedStudent(null);
          }}
          className="w-full p-2 border rounded"
          placeholder="Enter name or roll number"
        />
        {students.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
            {students.map((student) => (
              <li
                key={student.roll_no}
                className="p-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setSelectedStudent(student);
                  setStudentQuery(`${student.name} (${student.roll_no})`);
                  setStudents([]);
                }}
              >
                {student.name} ({student.roll_no})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dates */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Issue Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Return Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleIssue}
      >
        Issue Book
      </button>
    </div>
  );
};

export default IssueBook;
