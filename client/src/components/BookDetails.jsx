import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, author, image, available } = location.state || {};
  const [imgSrc, setImgSrc] = useState(image);

  if (!location.state) {
    return <div className="text-center p-10">No book details found.</div>;
  }

  return (
    <div className='w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-fit'>
      
      <div className='w-full md:w-1/2 bg-gray-50 p-8 flex justify-center items-center relative'>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors text-gray-600"
        >
          <FaArrowLeft />
        </button>
        <img 
          src={imgSrc} 
          alt={name} 
          onError={() => {
            if (id) setImgSrc(`https://covers.openlibrary.org/b/isbn/${id}-L.jpg`);
            else setImgSrc("https://via.placeholder.com/150?text=No+Cover");
          }}
          className='max-w-full max-h-[400px] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300' 
        />
      </div>

      <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center'>
        <div className="mb-auto">
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2 leading-tight'>{name}</h1>
          <h2 className='text-xl text-gray-500 font-medium mb-6'>{author}</h2>
          
          <div className="flex items-center gap-4 mb-8">
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {available > 0 ? 'Available' : 'Out of Stock'}
            </span>
            <span className='text-gray-600 font-medium'>
              {available} copies in library
            </span>
          </div>
        </div>

        {available > 0 ? (
          <button className='w-full py-4 bg-[#2274A5] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#1a5b82] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'>
            Request to Issue
          </button>
        ) : (
          <button disabled className='w-full py-4 bg-gray-200 text-gray-400 rounded-xl font-bold text-lg cursor-not-allowed'>
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetails;