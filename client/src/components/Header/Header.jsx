import React from 'react'
import Logo from '../../assets/Logo.jpg'
import Nav from '../Nav/Nav'

const Header = () => {
  return (
    <div>
      <img src={Logo} alt="logo" />
      <Nav />
    </div>
  )
}

export default Header
