import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './NavItem.module.scss'

const NavItem = ({name, path, icon, isOpen, setIsOpen}) => {
  return (
    <li className={styles.NavItem} onClick={() => setIsOpen(!isOpen)}>
      <NavLink className={({isActive}) => (isActive ? styles.Active : '')} to={path}>
        {icon && <img src={icon} alt="icon" />}
        {name}
      </NavLink>
    </li>
  )
}

export default NavItem
