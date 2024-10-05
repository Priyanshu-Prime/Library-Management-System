import React from 'react'

const BookCard = ({ name, author, image }) => {
  return (
    <div className='w-44 h-60 ml-4 mt-4 rounded-lg bg-[#64CF7BDE] flex flex-col items-center justify-center'>
      <div className='w-full h-4/5 flex justify-center items-center'>
        <img src={image} className='w-4/5 h-4/5 object-contain'></img>
      </div>
      <div className='w-full h-1/3 pl-2 pb-4'>
        <div className='text-l font-semibold'>{name}</div>
        <div className='text-m'>{author}</div>
      </div>
    </div>
  )
}

export default BookCard