import React from 'react'
import SidebarRow from './SidebarRow'
import Profile from './Profile'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name)
      setUserName(name);
  }, []);
  return (
    <div className='h-full w-1/5 bg-[#64CF7BDE] sticky top-0'>
        <div className='h-2/5 w-full flex flex-col justify-center'>
            <Profile height='50px' width='50px' />
            <div className='h-1/2 self-center content-center text-2xl font-normal'>Welcome {userName}</div>
        </div>
        <div className='h-3/5 w-full flex flex-col pt-20'>
            <SidebarRow redirectUrl='inventory' row_content='Book Inventory' />
            <SidebarRow redirectUrl='requests' row_content='Book Requests' />
            <SidebarRow redirectUrl='profile' row_content='Account Info' />
        </div>
    </div>
  )
}

export default Sidebar
