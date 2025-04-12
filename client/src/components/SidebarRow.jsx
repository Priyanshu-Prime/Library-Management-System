import React from 'react'
import { Link, redirect } from 'react-router-dom'

const SidebarRow = (props) => {
  const handleClick = () => {
    console.log(props.redirectUrl)
  }

  return (
    <div>
      <Link to={'/' + props.redirectUrl}>
        <button onClick={ handleClick } className='w-full hover:text-black text-white hover:bg-[#3B90C2] transition-text duration-150 ease-in-out h-14 bg-[#2274A5] text-center content-center text-l font-normal'>{props.row_content}</button>
      </Link>
    </div>
  )
}

export default SidebarRow