import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const PORT = import.meta.env.VITE_SERVER_PORT;

const AccountInfo = () => {
    const [students, setStudents] = useState([]) 

    const fetchBooks = async () => {
        const url = `http://localhost:${PORT}/api/students`

        try {
            const response = await axios.get(url)
            setStudents(response.data)
            console.log(students)
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
            {students.length > 0 ? (
                    <div className="w-full">
                        {students.map((student) => (
                            <div key={student.id} className="p-4 mb-2 rounded shadow">
                                <h3 className="text-lg font-bold">{student.name}</h3>
                                <p className="text-gray-700">Student ID: {student.roll_no}</p>
                                <p className="text-gray-700">Student Email: {student.email}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No students available.</p>
                )}
            </div>
        </div>
    );
};

export default AccountInfo;
