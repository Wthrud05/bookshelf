import React from 'react'
import NavItem from '../NavItem/NavItem'
import styles from './Nav.module.scss'
import main from '../../assets/main.svg'
import profile from '../../assets/profile.svg'
import about from '../../assets/about.svg'
const nav = [
  {name: 'Главная', path: '/', icon: main},
  {name: 'Профиль', path: '/profile', icon: profile},
  {name: 'О Bookshelf', path: '/about', icon: about},
]

const Nav = () => {
  return (
    <div className={styles.Nav}>
      <ul>
        {nav.map((i) => (
          <NavItem key={i.name} name={i.name} path={i.path} icon={i.icon} />
        ))}
      </ul>
    </div>
  )
}

export default Nav
