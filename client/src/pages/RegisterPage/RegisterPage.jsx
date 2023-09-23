import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import {NavLink} from 'react-router-dom'
import pattern from '../../assets/pattern.jpg'
import styles from './RegisterPage.module.scss'

const RegisterPage = () => {
  return (
    <div className={styles.Register}>
      <h1>Добро пожаловать в Bookshelf!</h1>
      <LoginForm title={'Регистрация'} handler={() => {}} />
      <span>
        У вас уже есть аккаунт? <NavLink to={'/login'}>Авторизация</NavLink>
      </span>
      <img className={styles.Pattern} src={pattern} alt="pattern" />
    </div>
  )
}

export default RegisterPage
