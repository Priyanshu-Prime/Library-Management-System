import React from 'react'
import { Link, redirect } from 'react-router-dom'

const SidebarRow = (props) => {
  const handleClick = () => {
    console.log(props.redirectUrl)
  }

  return (
    <Link to={'/' + props.redirectUrl}>
      <button onClick={ handleClick } className='w-full h-14 bg-[#D9D9D926] text-center content-center text-l font-normal'>{props.row_content}</button>
    </Link>
  )
}

export default SidebarRow