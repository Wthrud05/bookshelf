import React, {useState} from 'react'
import styles from './LoginForm.module.scss'
import Username from '../../assets/user.svg?react'
import Pass from '../../assets/pass.svg?react'
import BookLoader from '../BookLoader/BookLoader'
import hidePass from '../../assets/hide-pass.svg'
import showPass from '../../assets/show-pass.svg'
import {useSelector} from 'react-redux'

const LoginForm = ({title, handler}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isHidden, setIsHidden] = useState(true)

  const {error, loading} = useSelector((state) => state.auth)

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      handler(name, password)
    }
  }

  return (
    <div className={styles.LoginForm} onKeyDown={keyDownHandler}>
      <h3>{title}</h3>
      <div className={styles.InputBox}>
        <input
          placeholder="Имя пользователя"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Username className={styles.Icon} />
      </div>
      <div className={styles.InputBox}>
        <input
          placeholder="Пароль"
          type={isHidden ? 'password' : 'text'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Pass className={styles.Icon} />
        <img
          className={styles.ShowHidePass}
          src={isHidden ? showPass : hidePass}
          alt="hide/show"
          title={isHidden ? 'Показать пароль' : 'Скрыть пароль'}
          onClick={() => setIsHidden(!isHidden)}
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
