import React, {useEffect} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import {NavLink, useNavigate} from 'react-router-dom'
import pattern from '../../assets/pattern.jpg'
import styles from './RegisterPage.module.scss'
import {useDispatch} from 'react-redux'
import {setError, loginUserThunk} from '../../redux/auth/slice'
import {motion} from 'framer-motion'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  useEffect(() => {
    dispatch(setError({error: ''}))
  }, [])

  const registerUser = (userName, password) => {
    try {
      dispatch(loginUserThunk({userName, password, navigator, type: 'register'}))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      className={styles.Register}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.2}}
    >
      <h1>Добро пожаловать в Bookshelf!</h1>
      <LoginForm title={'Регистрация'} handler={registerUser} />
      <span>
        У вас уже есть аккаунт? <NavLink to={'/login'}>Авторизация</NavLink>
      </span>
      <img className={styles.Pattern} src={pattern} alt="pattern" />
    </motion.div>
  )
}

export default RegisterPage
