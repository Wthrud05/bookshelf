import React, {useState} from 'react'
import styles from './LoginForm.module.scss'
import username from '../../assets/user.svg'
import pass from '../../assets/pass.svg'
import BookLoader from '../BookLoader/BookLoader'

const LoginForm = ({title, handler, error, loading}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.LoginForm}>
      <h3>{title}</h3>
      <div className={styles.InputBox}>
        <img src={username} alt="username" />
        <input
          placeholder="Имя пользователя"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.InputBox}>
        <img src={pass} alt="password" />
        <input
          placeholder="Пароль"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? (
        <span className={styles.Error}>
          <b className={error.length ? styles.ErrorText : ''}>{error}</b>
        </span>
      ) : (
        <span className={styles.Error}>
          <b></b>
        </span>
      )}
      <button
        onClick={() => {
          handler(name, password)
        }}
      >
        {loading ? <BookLoader /> : <span>{title}</span>}
      </button>
    </div>
  )
}

export default LoginForm
