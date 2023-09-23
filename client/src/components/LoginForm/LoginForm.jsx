import React from 'react'
import styles from './LoginForm.module.scss'
import username from '../../assets/user.svg'
import password from '../../assets/password.svg'

const LoginForm = ({title, handler}) => {
  return (
    <div className={styles.LoginForm}>
      <h3>{title}</h3>
      <div>
        <img src={username} alt="username" />
        <input placeholder="Имя пользователя" type="text" />
      </div>
      <div>
        <img src={password} alt="password" />
        <input placeholder="Пароль" type="text" />
      </div>
      <button onClick={handler}>{title}</button>
    </div>
  )
}

export default LoginForm
