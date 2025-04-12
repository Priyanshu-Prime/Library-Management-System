import Sidebar from '../../components/Sidebar'
import BookDetails from '../../components/BookDetails'

const BookInfo = () => {
    return (
        <div className='h-screen w-screen flex'>
            <Sidebar />
            <div className='h-full w-4/5 bg-[#F0F7F4] flex justify-center'>
                <BookDetails />
            </div>
        </div>
    )
}
  
export default BookInfo