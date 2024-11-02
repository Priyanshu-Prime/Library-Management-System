import React from 'react'
import SearchBar from './SearchBar'


const InventoryTopBar = ({onSearch}) => {
  return (
    <div className='w-full h-1/6 flex justify-end items-center'>
        <SearchBar onSearch={onSearch}/>
    </div>
  )
}

export default InventoryTopBar