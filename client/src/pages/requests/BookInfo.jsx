import Sidebar from '../../components/Sidebar'
import BookDetails from '../../components/BookDetails'

const BookInfo = () => {
    return (
        <div className='h-screen w-screen flex bg-gray-50 overflow-hidden'>
            <Sidebar />
            <div className='flex-1 h-full overflow-y-auto flex justify-center p-8'>
                <BookDetails />
            </div>
        </div>
    )
}
  
export default BookInfo