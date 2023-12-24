import React, {useEffect} from 'react'
import {useAuth} from './hooks/useAuth'
import {useLocation, useNavigate} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {useDispatch} from 'react-redux'
import {setUser} from './redux/auth/slice'
import {setSortType} from './redux/books/slice'
import AnimatedRoutes from './components/AnimatedRoutes'

function App() {
  const {user, isAuth} = useAuth()

  const navigator = useNavigate()
  const dispatch = useDispatch()

  const navigation = useLocation()

  const category = JSON.parse(localStorage.getItem('sort'))

  useEffect(() => {
    isAuth ? navigator('/') : navigator('/login')
    user ? dispatch(setUser({id: user.id, name: user.name})) : null

    if (!JSON.parse(localStorage.getItem('sort'))) {
      localStorage.setItem('sort', JSON.stringify('Новые'))
      dispatch(setSortType({sortType: 'Новые'}))
    } else {
      dispatch(setSortType({sortType: category}))
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <div className={navigation.pathname === '/about' ? 'content-about' : 'content'}>
        <AnimatedRoutes />
      </div>
      <Footer />
    </div>
  )
}

export default App
