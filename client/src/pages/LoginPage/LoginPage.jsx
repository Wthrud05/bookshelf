import React, {useEffect} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import {NavLink, useNavigate} from 'react-router-dom'
import pattern from '../../assets/pattern.jpg'
import styles from './LoginPage.module.scss'
import {useDispatch} from 'react-redux'
import {loginUserThunk, setError} from '../../redux/auth/slice'
import {motion} from 'framer-motion'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  useEffect(() => {
    dispatch(setError({error: ''}))
  }, [])

  const loginUser = (userName, password) => {
    try {
      dispatch(loginUserThunk({userName, password, navigator, type: 'login'}))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      className={styles.Login}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.2}}
    >
      <h1>С возвращением в Bookshelf!</h1>
      <LoginForm title={'Авторизация'} handler={loginUser} />
      <span>
        У вас ещё нет аккаунта? <NavLink to={'/register'}>Регистрация</NavLink>
      </span>
      <img className={styles.Pattern} src={pattern} alt="pattern" />
    </motion.div>
  )
}

export default LoginPage
