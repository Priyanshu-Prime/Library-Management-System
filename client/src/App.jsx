import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import Dashboard from './pages/dashboard/Dashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import Inventory from './pages/inventory/Inventory'
import BooksIssued from './pages/booksIssued/BooksIssued'
import BookRequests from './pages/requests/BookRequests'
import AccountInfo from './pages/accountInfo/AccountInfo'
import NewIssue from './pages/newIssue/NewIssue'
import {gapi} from 'gapi-script'
import { GoogleLogin } from '@react-oauth/google';

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/issued" element={<BooksIssued />} />
        <Route path="/requests" element={<BookRequests />} />
        <Route path="/profile" element={<AccountInfo />} />
        <Route path="/newissue" element={<NewIssue />} />
        <Route path="*" element={< LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App