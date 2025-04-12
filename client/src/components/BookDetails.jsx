import { useLocation } from 'react-router-dom';

const BookDetails = () => {
  const location = useLocation();
  const { name, author, image, available } = location.state || {};

  return (
    <div className='h-full w-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center'>
      
      <div className='w-full h-2/3 flex justify-center items-center mb-6'>
        <img src={image} alt={name} className='w-1/3 h-full object-contain rounded-md shadow-md' />
      </div>

     
      <div className='w-full h-2/3 flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>{name}</h1>
        <h2 className='text-xl text-gray-600 mb-4'>Author: {author}</h2>
        <p className='text-lg text-gray-700 mb-4'>Available Copies: <span className='font-semibold'>{available}</span></p>
      </div>

    {available > 0 && (
      <div className='w-full flex justify-center mt-6'>
        {/* Add backend functionality to this button */}
        <button className='px-6 py-2 bg-[#2274A5] text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300'>
          Request Book
        </button>
      </div>
    )}
    </div>
  );
};

export default BookDetails;