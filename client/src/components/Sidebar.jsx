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
    <div className='h-full shadow-xl shadow-black/100 w-1/4 bg-[#2274A5] sticky top-0'>
        <div className='h-2/5 mt-2 w-full flex flex-col justify-center'>
            <Profile height='50px' width='50px' />
            <div className='h-1/3 text-white self-center content-center text-2xl font-normal p-1'>Welcome</div>
            <div className='h-1/2 text-white self-center content-center text-2xl font-bold p-'>{userName}</div>
        </div>
        <div className='h-3/5 w-full flex flex-col pt-20'>
            <SidebarRow redirectUrl='inventory' row_content='Book Inventory' />
            <SidebarRow redirectUrl='issued' row_content='Books Issued' />
            <SidebarRow redirectUrl='requests' row_content='Book Requests' />
            <SidebarRow redirectUrl='profile' row_content='Account Info' />
        </div>
    </div>
  )
}

export default Sidebar
