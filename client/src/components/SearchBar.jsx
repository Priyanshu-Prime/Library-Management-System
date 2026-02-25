import {useState} from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };
  return (
      <div className="w-full max-w-md">
          <div className="relative flex items-center w-full h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden border border-gray-200 transition-shadow duration-300">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                  <FaSearch className="h-5 w-5 text-[#2274A5]" />
              </div>

              <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent placeholder-gray-400"
                  type="text"
                  id="search"
                  placeholder="Search books, authors, ISBNs..." 
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                  }}
              />
              
              <button 
                onClick={handleSearch}
                className="h-full px-6 bg-[#2274A5] text-white font-medium hover:bg-[#1a5b82] transition-colors duration-200"
              >
                Search
              </button>
          </div>
      </div>
  );
}