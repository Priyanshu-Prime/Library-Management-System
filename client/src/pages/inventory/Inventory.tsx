// import Sidebar from '../../components/Sidebar';
import Sidebar from '@/components/UserSideBar';
import InventoryTopBar from '@/components/InventoryTopBar';
import BookCardNew from '@/components/BookCardNew';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PORT = import.meta.env.VITE_SERVER_PORT;

const Inventory = () => {
  interface Books {
    id: string;
    name: string;
    subject: string;
    author: string;
    publication: string;
    image: string;
  }

  const [books, setBooks] = useState<Books[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // New loading state

  const fetchBooks = async (searchParams?: string) => {
    let url = searchParams
      ? `http://localhost:${PORT}/api/books/filter/${searchParams}`
      : `http://localhost:${PORT}/api/books`;

    try {
      setIsLoading(true); // Start loading
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (searchTerm: string) => {
    fetchBooks(searchTerm);
  };

  return (
    <Sidebar>
      <div className='flex-1 flex flex-col'>
        <InventoryTopBar onSearch={handleSearch} />
        <div className='flex-1 p-6 overflow-y-auto'>
          {isLoading ? (
            <p className='text-center text-gray-500'>Loading books...</p>
          ) : books.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {books.map((book) => (
                <BookCardNew
                  key={book.id} // Added unique key for each book
                  name={book.name}
                  author={book.author}
                  image={book.image}
                />
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500'>No books available.</p>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default Inventory;
