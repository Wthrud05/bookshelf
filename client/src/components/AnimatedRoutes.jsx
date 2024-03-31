import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import BookPage from '../pages/BookPage/BookPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import UserPage from '../pages/UserPage/UserPage'
import AboutPage from '../pages/AboutPage/AboutPage'
import {AnimatePresence} from 'framer-motion'
import SearchBooks from '../pages/SearchBooks/SearchBooks'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence initial={true} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/register" element={<RegisterPage />} />.
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchBooks />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
