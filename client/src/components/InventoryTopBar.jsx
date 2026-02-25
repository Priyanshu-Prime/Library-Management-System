import React from 'react'
import SearchBar from './SearchBar'


const InventoryTopBar = ({onSearch}) => {
  return (
    <div className='w-full py-6 px-8 flex justify-between items-center bg-white shadow-sm mb-6'>
        <h2 className="text-2xl font-bold text-gray-800">Library Inventory</h2>
        <SearchBar onSearch={onSearch}/>
    </div>
  )
}

export default InventoryTopBar