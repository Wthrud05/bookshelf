import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const NavItem = ({name, path}) => {
  return (
    <li>
      <NavLink to={path}>{name}</NavLink>
    </li>
  )
}

export default NavItem
