import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import Dashboard from './pages/dashboard/Dashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import Inventory from './pages/inventory/Inventory'
import BooksIssued from './pages/booksIssued/BooksIssued'
import BookInfo from './pages/requests/BookInfo'
import AccountInfo from './pages/accountInfo/AccountInfo'
import Defaulters from './pages/booksIssued/Defaulters'

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/issued" element={<BooksIssued />} />
        <Route path="/requestbook" element={<BookInfo />} />
        <Route path="/profile" element={<AccountInfo />} />
        <Route path="/defaulters" element={<Defaulters />} />
        <Route path="*" element={< LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App