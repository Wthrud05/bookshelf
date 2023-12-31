import React from 'react'
import Nav from '../Nav/Nav'
import styles from './Header.module.scss'
import {NavLink} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'
import logo from '../../assets/logo copy.svg'

const Header = () => {
  const {isAuth} = useAuth()

  return (
    <div className={styles.Header}>
      <NavLink to={isAuth ? '/' : '/login'}>
        <img src={logo} alt="logo" />
      </NavLink>
      <Nav />
    </div>
  )
}

export default Header
