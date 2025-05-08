import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../../components/Sidebar";
import Photo from "../../components/Photo";

const AdminDashboard = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // useEffect(() => {
  //   // Redirect to the /issued route
  //   navigate("/issued");
  // }, [navigate]); // Dependency array ensures it runs once on mount

  return (
    <div className="h-screen w-screen flex">
      <Sidebar isAdmin={true} />
      <div className="h-full w-4/5 bg-[#F0F7F4] flex flex-col p-8">
        <h1 className="text-3xl font-bold text-[#2274A5] mb-6">
          Library IIIT Admin Dashboard
        </h1>
      <Photo src="/library.jpg" alt="Library" caption="Welcome to the library" />
      </div>
    </div>
  );
};

export default AdminDashboard;