import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const PORT = import.meta.env.VITE_SERVER_PORT;

const AccountInfo = () => {
    
    const [uid, setUID] = useState('');
  useEffect(() => {
    const id = localStorage.getItem('uid');
    if (id)
      setUID(id);
  }, []);
    const [students, setStudents] = useState([]) 
    console.log(uid);
    const fetchBooks = async () => {
        const url = `http://localhost:${PORT}/api/students/${uid}`

        try {
            const response = await axios.get(url)
            console.log(`DATA:  ${response.data}`);
            setStudents(response.data)
            console.log(`YE LE BSDK: ${(students)}`);
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
            <div className="h-full w-4/5 bg-[#A1EEC5] flex flex-col overflow-y-auto">
            <InventoryTopBar />
            {students.length > 0 ? (
                    <div className="h-5/6 w-full">
                        {/* {students.map((student) => (
                            <div key={student.id} className="p-4 rounded shadow">
                                <h3 className="text-lg font-bold">{student.name}</h3>
                                <p className="text-gray-700">Student ID: {student.roll_no}</p>
                                <p className="text-gray-700">Student Email: {student.email}</p>
                            </div>
                        ))} */}
                        <div key={students.id} className="p-4 rounded shadow">
                            <h3 className="text-lg font-bold">{students.name}</h3>
                            <p className="text-gray-700">Student ID: {students.roll_no}</p>
                            <p className="text-gray-700">Student Email: {students.email}</p>
                        </div>
                        
                    </div>
                ) : (
                    <p>No students available.</p>
                )}
            </div>
        </div>
    );
};

export default AccountInfo;
