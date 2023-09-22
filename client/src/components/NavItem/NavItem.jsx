import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './NavItem.module.scss'

const NavItem = ({name, path, icon}) => {
  return (
    <li className={styles.NavItem}>
      <NavLink className={({isActive}) => (isActive ? styles.Active : '')} to={path}>
        <img src={icon} alt="icon" />
        {name}
      </NavLink>
    </li>
  )
}

export default NavItem
