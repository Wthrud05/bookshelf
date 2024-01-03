import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './NavItem.module.scss'
import {motion} from 'framer-motion'

const NavItem = ({name, path, icon, isOpen, setIsOpen}) => {
  return (
    <li
      className={styles.NavItem}
      onClick={() => setIsOpen(!isOpen)}
      initial={{scale: 1}}
      whileHover={{scale: 1.05}}
    >
      <NavLink className={({isActive}) => (isActive ? styles.Active : '')} to={path}>
        {icon && <img src={icon} alt="icon" />}
        {name}
      </NavLink>
    </li>
  )
}

export default NavItem
