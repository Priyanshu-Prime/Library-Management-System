import React from 'react'
import SearchBar from './SearchBar'

const InventoryTopBar = () => {
  return (
    <div className='w-full h-1/6 flex justify-end items-center'>
        <SearchBar />
    </div>
  )
}

export default InventoryTopBar