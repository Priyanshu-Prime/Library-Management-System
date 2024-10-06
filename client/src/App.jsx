import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import Dashboard from './pages/dashboard/Dashboard'
import Inventory from './pages/inventory/Inventory'
import BooksIssued from './pages/booksIssued/BooksIssued'
import BookRequests from './pages/requests/BookRequests'
import AccountInfo from './pages/accountInfo/AccountInfo'
import {gapi} from 'gapi-script'
import { GoogleLogin } from '@react-oauth/google';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/issued" element={<BooksIssued />} />
        <Route path="/requests" element={<BookRequests />} />
        <Route path="/profile" element={<AccountInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App