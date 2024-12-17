import React from 'react';
// import Sidebar from '../../components/Sidebar';
import Sidebar from '@/components/UserSideBar';

const BookRequests = () => {
  return (
    <div className='h-screen w-full flex'>
      <Sidebar>
        <div className='h-full w-full bg-[#A1EEC5] flex justify-center'></div>
      </Sidebar>
    </div>
  );
};

export default BookRequests;
