import React from 'react'
import Sidebar from '../../components/Sidebar'
import ReadingImg from '../../components/ReadingImg'



const AdminDashboard = () => {
  return (
    <div className='h-screen w-screen flex'>
    <Sidebar isAdmin={true} />
    <div className='h-full w-4/5 bg-[#F0F7F4] flex justify-center'>
      {/* <ReadingImg /> */}
    </div>
  </div>
  )
}

export default AdminDashboard