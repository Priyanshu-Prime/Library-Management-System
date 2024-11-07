import React from "react";
import Sidebar from "../../components/Sidebar";
import InventoryTopBar from "../../components/InventoryTopBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import moment from 'moment'

const PORT = import.meta.env.VITE_SERVER_PORT;

const AccountInfo = () => {
    
    const [uid, setUID] = useState('');
  useEffect(() => {
    const id = localStorage.getItem('uid');
    if (id)
      setUID(id);
  }, []);
    const [students, setStudents] = useState([]) 
    const [issues, setIssues] = useState([]) 
    // console.log(uid);
    const fetchStudents = async () => {
        const url = `http://localhost:${PORT}/api/students/${uid}`

        try {
            const response = await axios.get(url);
            setStudents(response.data);
            console.log(students);
        }
        catch(error) {
            console.log(error)
        }
    }

    const fetchIssues = async () => {
        const url = `http://localhost:${PORT}/api/issues/student/${uid}`;

        try {
            const response = await axios.get(url)
            setIssues(response.data)
            console.log(issues)
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (uid) fetchStudents()
    }, [uid])

    useEffect(() => {
       if (uid) fetchIssues()
    }, [uid])

    return (
        <div className="h-screen w-screen flex">
            <Sidebar />
            <div className="h-full w-4/5 bg-[#A1EEC5] flex flex-col overflow-y-auto">
            <InventoryTopBar />
            {Object.keys(students).length > 0 ? (
                    <div className="h-5/6 w-full">
                        {/* {students.map((student) => (
                            <div key={student.id} className="p-4 rounded shadow">
                                <h3 className="text-lg font-bold">{student.name}</h3>
                                <p className="text-gray-700">Student ID: {student.roll_no}</p>
                                <p className="text-gray-700">Student Email: {student.email}</p>
                            </div>
                        ))} */}
                        <div key={students.roll_no} className="p-4 rounded justify-between items-center">
                            <h3 className="text-lg font-bold ">{students.name}</h3>
                            <p className="text-stone-950">Student ID: {students.roll_no}</p>
                            <p className="text-stone-950">Student Email: {students.email}</p>
                        </div>
                    </div>
                ) : (
                    <p>No students available.</p>
                )}
                {issues.length > 0 ? (
                    <div className="h-5/6 w-full">
                        {issues.map((issue) => (
                            <div key={issue.id} className="p-4 flex rounded shadow justify-between items-center">
                                <h3 className="text-md font-bold">{issue.book.name}</h3>
                                <div className="w-1/3 text-center"> 
                                    <p className=" text-md text-gray-700">Date of Issue: {moment(issue.date_of_issue).format("DD-MM-YYYY")}</p>
                                    <p className="text-md text-gray-700">Date of Return: {moment(issue.date_of_return).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No issues available.</p>
                )}
            </div>
        </div>
    );
};

export default AccountInfo;
