import React from 'react'
import reading_img from '../assets/reading.png'

const ReadingImg = () => {
  return (
    <div className='flex h-1/2 w-4/5 justify-center self-center'>
        <img src={reading_img} className='content-center' />
    </div>
  )
}

export default ReadingImg