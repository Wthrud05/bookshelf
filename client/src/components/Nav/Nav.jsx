import React from 'react'
import NavItem from '../NavItem/NavItem'
const nav = [
  {name: 'Главная', path: '/'},
  {name: 'Профиль', path: '/profile'},
  {name: 'О Bookshelf', path: '/about'},
]

const Nav = () => {
  return (
    <div>
      <ul>
        {nav.map((i) => (
          <NavItem name={i.name} path={i.path} />
        ))}
      </ul>
    </div>
  )
}

export default Nav
