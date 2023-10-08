import React, {useEffect} from 'react'
import {useAuth} from './hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import BookPage from './pages/BookPage/BookPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import UserPage from './pages/UserPage/UserPage'
import AboutPage from './pages/AboutPage/AboutPage'
import {useDispatch} from 'react-redux'
import {setUser} from './redux/auth/slice'

function App() {
  const {user, isAuth} = useAuth()

  const navigator = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    isAuth ? navigator('/') : navigator('/login')
    user ? dispatch(setUser({id: user.id, name: user.name})) : null
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookPage />} />
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
