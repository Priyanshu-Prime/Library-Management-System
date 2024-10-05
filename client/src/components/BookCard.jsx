import React from 'react'

const BookCard = ({ name, author }) => {
  return (
    <div className='w-40 h-52 ml-4 mt-4 rounded-lg bg-[#64CF7BDE] flex flex-col items-center justify-center'>
        <div className='text-l font-semibold'>{name}</div>
        <div className='text-m'>{author}</div>
    </div>
  )
}

export default BookCard