import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

const BookCard = ({ id, name, author, image, available }) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(image);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(image || (id ? `https://covers.openlibrary.org/b/isbn/${id}-L.jpg` : "https://via.placeholder.com/150?text=No+Cover"));
  }, [image, id]);

  const handleBookClick = () => {
    navigate('/requestbook', { state: { id, name, author, image: imgSrc, available } });
  }

  const handleError = () => {
    if (!hasError && id) {
        setHasError(true);
        setImgSrc(`https://covers.openlibrary.org/b/isbn/${id}-L.jpg`);
    } else {
        setImgSrc("https://via.placeholder.com/150?text=No+Cover");
    }
  }

  return (
    <div 
      onClick={handleBookClick} 
      className='w-full h-full bg-white rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100 flex flex-col'
    >
      <div className='w-full h-48 p-4 bg-gray-50 flex justify-center items-center relative'>
        <img 
          src={imgSrc} 
          alt={name}
          onError={handleError}
          className='h-full object-contain drop-shadow-md'
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {available > 0 ? 'Available' : 'Out of Stock'}
        </div>
      </div>
      
      <div className='p-4 flex flex-col flex-grow justify-between'>
        <div>
          <h3 className='text-lg font-bold text-gray-800 leading-tight mb-1 line-clamp-2' title={name}>
            {name}
          </h3>
          <p className='text-sm text-gray-500 font-medium truncate' title={author}>
            {author}
          </p>
        </div>
        
        <div className='mt-4 pt-3 border-t border-gray-100 flex justify-between items-center'>
          <span className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>Copies</span>
          <span className='text-sm font-bold text-[#2274A5]'>{available}</span>
        </div>
      </div>
    </div>
  )
}

export default BookCard