import { useNavigate } from 'react-router-dom'

const BookCard = ({ name, author, image, available }) => {
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate('/requestbook', { state: { name, author, image, available } });
  }
  return (
    <div onClick={handleBookClick} className='w-48 mx-4 h-64 ml-4 my-4 rounded-lg bg-[#B3BFB8] flex flex-col items-center justify-center 
                    transform transition-transform duration-300 hover:scale-105 overflow-hidden'>
      <div className='w-full h-4/6 flex justify-center items-center'>
        <img src={image} className='w-4/5 h-4/5 object-contain'></img>
      </div>
      <div className='w-full h-2/6 px-2 pb-2 flex flex-col justify-between'>
        <div className='text-l font-semibold truncate hover:whitespace-normal hover:overflow-visible hover:h-auto'>
          {name}
        </div>
        <div className='text-m truncate'>{author}</div>
        <div className='text-sm text-gray-700'>Available: {available=4}</div>
      </div>
    </div>
  )
}

export default BookCard