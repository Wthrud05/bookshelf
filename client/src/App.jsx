import React, {useEffect} from 'react'
import {useAuth} from './hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import UserPage from './pages/UserPage/UserPage'
import AboutPage from './pages/AboutPage/AboutPage'

function App() {
  const isAuth = useAuth()
  const navigator = useNavigate()

  useEffect(() => {
    isAuth ? navigator('/') : navigator('/login')
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
