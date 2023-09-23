import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import {NavLink} from 'react-router-dom'
import pattern from '../../assets/pattern.jpg'
import styles from './LoginPage.module.scss'

const LoginPage = () => {
  return (
    <div className={styles.Login}>
      <h1>С возвращением в Bookshelf!</h1>
      <LoginForm title={'Авторизация'} handler={() => {}} />
      <span>
        У вас ещё нет аккаунта? <NavLink to={'/register'}>Регистрация</NavLink>
      </span>
      <img className={styles.Pattern} src={pattern} alt="pattern" />
    </div>
  )
}

export default LoginPage
