import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewIssueForm = () => {
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);

    const PORT = import.meta.env.VITE_SERVER_PORT;

    // Fetch books for dropdown
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const url = `http://localhost:${PORT}/api/books/`;
                const response = await axios.get(url);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    // Fetch student name based on entered student ID
    const fetchStudentName = async (id) => {
        try {
            const url = `http://localhost:${PORT}/api/students/${id}`
            const response = await axios.get(url);
            setStudentName(response.data.name);
        } catch (error) {
            console.error('Error fetching student:', error);
            setStudentName('');
        }
    };

    const handleStudentIdChange = (e) => {
        const id = e.target.value;
        setStudentId(id);
        if (id) fetchStudentName(id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                bookid: bookId,
                studentid: parseInt(studentId),
                dateofissue: issueDate,
            };
            console.log(data);
            const url = `http://localhost:${PORT}/api/issues/createissue`
            await axios.post(url, data);
            alert('Book issued successfully!');
        } catch (error) {
            console.error('Error issuing book:', error);
            alert('Failed to issue book.');
        }
    };

    useEffect(() => {
        console.log("Books data:", books);
    }, [books]);
    

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Book</label>
                <select
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    required
                >
                    <option value="">Select a book</option>
                    {Array.isArray(books) && books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.id} - {book.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Student ID</label>
                <input
                    type="text"
                    value={studentId}
                    onChange={handleStudentIdChange}
                    className="border px-3 py-2 rounded w-full"
                    required
                />
                {studentName && (
                    <p className="text-gray-500 mt-1">Student Name: {studentName}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Date of Issue</label>
                <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Issue Book
            </button>
        </form>
    );
};

export default NewIssueForm;
