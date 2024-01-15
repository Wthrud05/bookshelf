import React, {useEffect, useState} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import {NavLink, useNavigate} from 'react-router-dom'
import pattern from '../../assets/pattern.jpg'
import styles from './LoginPage.module.scss'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setUser, setError, setLoading} from '../../redux/auth/slice'
import {motion} from 'framer-motion'

const LoginPage = () => {
  const API_URL = import.meta.env.VITE_API_URL

  const dispatch = useDispatch()
  const navigator = useNavigate()

  const err = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    dispatch(setError({error: ''}))
  }, [])

  const loginUser = async (userName, password) => {
    try {
      dispatch(setLoading({loading: true}))
      dispatch(setError({error: ''}))

      if (userName.length < 2 && password.length < 6) {
        dispatch(setError({error: 'Имя должно содержать хотя-бы 2 символа, пароль 6 символов'}))
        dispatch(setLoading({loading: false}))
      } else {
        const res = await axios
          .post(`${API_URL}/login`, {
            name: userName,
            password,
          })
          .catch((error) => {
            if (error.response) {
              const msg = error.response.data.message
              dispatch(setError({error: msg}))
              dispatch(setLoading({loading: false}))
            }
          })
        const {id, name} = await res.data.user
        dispatch(setUser({id, name}))
        localStorage.setItem('user', JSON.stringify({id, name}))
        dispatch(setLoading({loading: false}))
        navigator('/')
      }
    } catch (error) {
      dispatch(setLoading({loading: false}))
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
      <LoginForm title={'Авторизация'} handler={loginUser} error={err} loading={loading} />
      <span>
        У вас ещё нет аккаунта? <NavLink to={'/register'}>Регистрация</NavLink>
      </span>
      <img className={styles.Pattern} src={pattern} alt="pattern" />
    </motion.div>
  )
}

export default LoginPage
