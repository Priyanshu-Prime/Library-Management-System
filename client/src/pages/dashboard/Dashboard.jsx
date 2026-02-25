import React from 'react'
import Sidebar from '../../components/Sidebar'
import { FaBook, FaClock, FaInfoCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-screen flex bg-gray-50'>
      <Sidebar isAdmin={false} />
      <div className='flex-1 flex flex-col overflow-y-auto'>
        {/* Header */}
        <div className="bg-white shadow-sm py-8 px-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to the Library
          </h1>
          <p className="text-gray-500 mt-2">Explore books, manage your account, and more.</p>
        </div>

        {/* Content */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Stat Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#2274A5] flex items-center">
            <div className="p-4 bg-blue-50 rounded-full text-[#2274A5] mr-4">
              <FaBook className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Books</h3>
              <p className="text-2xl font-bold text-gray-800">1,240</p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 flex items-center">
            <div className="p-4 bg-green-50 rounded-full text-green-500 mr-4">
              <FaClock className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Library Hours</h3>
              <p className="text-2xl font-bold text-gray-800">9 AM - 9 PM</p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 flex items-center">
            <div className="p-4 bg-purple-50 rounded-full text-purple-500 mr-4">
              <FaInfoCircle className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Help Desk</h3>
              <p className="text-lg font-bold text-gray-800">support@iiitt.ac.in</p>
            </div>
          </div>

          {/* Main Banner */}
          <div className="col-span-full bg-gradient-to-r from-[#2274A5] to-[#1a5b82] rounded-2xl p-8 text-white shadow-lg mt-4 relative overflow-hidden flex justify-between items-center">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Discover Your Next Read</h2>
              <p className="mb-6 text-blue-100">
                Browse our extensive collection of engineering, science, and literature books. 
                Check availability in real-time and request books directly from your dashboard.
              </p>
              <button 
                onClick={() => navigate('/inventory')}
                className="bg-white text-[#2274A5] px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-md"
              >
                Browse Inventory
              </button>
            </div>
            
            {/* Image Section */}
            <div className="hidden lg:block relative z-10 w-64 h-40 rounded-lg overflow-hidden shadow-2xl transform rotate-3 border-4 border-white/20">
               <img 
                 src="/library.jpg" 
                 alt="Library Interior" 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Decorative Circle */}
            <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard