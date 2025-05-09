import React from 'react'
import Sidebar from '../../components/Sidebar'
import ReadingImg from '../../components/ReadingImg'

const Dashboard = () => {
  return (
    <div className='h-screen w-screen flex'>
    <Sidebar isAdmin={false} />
    <div className='h-full w-4/5 bg-[#F0F7F4] flex justify-center'>
      <h1 className="text-3xl font-bold text-[#2274A5] mb-6">
        Library IIIT User Dashboard
      </h1>       
    </div>
    <Photo src="/library.jpg" alt="Library" caption="Welcome to the library" />
  </div>
  )
}

export default Dashboard