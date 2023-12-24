import React, {useEffect} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import pattern from '../../assets/pattern.jpg'
import styles from './RegisterPage.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setUser, setError, setLoading} from '../../redux/auth/slice'
import {motion} from 'framer-motion'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const err = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    dispatch(setError({error: ''}))
  }, [])

  const registerUser = async (userName, password) => {
    try {
      dispatch(setLoading({loading: true}))
      dispatch(setError({error: ''}))

      if (userName.length < 2 || password.length < 6) {
        dispatch(setError({error: 'Имя должно содержать хотя-бы 2 символа, пароль 6 символов'}))
        dispatch(setLoading({loading: false}))
      } else {
        const res = await axios
          .post('https://bookshelf-server-cb5y8i595-wthrud05.vercel.app/api/register', {
            name: userName,
            password,
          })
          .catch((error) => {
            if (error.response) {
              const msg = error.response.data.message
              dispatch(setError({error: msg}))
            }
          })
        console.log(res)
        const {id, name} = await res.data.user
        dispatch(setUser({id, name}))
        localStorage.setItem('user', JSON.stringify({id, name}))
        dispatch(setLoading({loading: false}))
        navigator('/')
      }
    } catch (error) {
      console.log(error.message)
      dispatch(setLoading({loading: false}))
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
      <LoginForm title={'Регистрация'} handler={registerUser} error={err} loading={loading} />
      <span>
        У вас уже есть аккаунт? <NavLink to={'/login'}>Авторизация</NavLink>
      </span>
      <img className={styles.Pattern} src={pattern} alt="pattern" />
    </motion.div>
  )
}

export default RegisterPage
