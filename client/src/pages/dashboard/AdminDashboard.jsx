// import React from 'react'
// import Sidebar from '../../components/Sidebar'
// import ReadingImg from '../../components/ReadingImg'



// const AdminDashboard = () => {
//   return (
//     <div className='h-screen w-screen flex'>
//     <Sidebar />
//     <div className='h-full w-4/5 bg-[#F0F7F4] flex justify-center'>
//       {/* <ReadingImg /> */}
//     </div>
//   </div>
//   )
// }

// export default AdminDashboard
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Redirect to the /issued route
    navigate("/issued");
  }, [navigate]); // Dependency array ensures it runs once on mount

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="h-full w-4/5 bg-[#F0F7F4] flex flex-col p-8">
        <h1 className="text-3xl font-bold text-[#2274A5] mb-6">
          Currently Issued Books
        </h1>
        <div className="overflow-y-auto">
          {issuedBooks.length > 0 ? (
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead className="bg-[#2274A5] text-white">
                <tr>
                  <th className="py-2 px-4">Book ID</th>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Issued To</th>
                  <th className="py-2 px-4">Issued Date</th>
                  <th className="py-2 px-4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {issuedBooks.map((book) => (
                  <tr key={book.id} className="text-center border-b">
                    <td className="py-2 px-4">{book.id}</td>
                    <td className="py-2 px-4">{book.title}</td>
                    <td className="py-2 px-4">{book.issuedTo}</td>
                    <td className="py-2 px-4">{book.issuedDate}</td>
                    <td className="py-2 px-4">{book.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-lg text-gray-600">
              No books are currently issued.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;