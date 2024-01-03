import React, {useEffect, useState} from 'react'
import NavItem from '../NavItem/NavItem'
import styles from './Nav.module.scss'
import {AnimatePresence, MotionConfig, motion} from 'framer-motion'
import {useLocation} from 'react-router-dom'
import {useGuest} from '../../hooks/useGuest'
import {nav, guestNav} from '../../utils/data'
import NavList from '../NavList/NavList'

const Nav = () => {
  const location = useLocation()
  const isGuest = useGuest()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  }, [isOpen])

  return (
    <div className={styles.Nav}>
      {isGuest ? (
        <>
          {location.pathname === '/register' || location.pathname === '/login' ? (
            ''
          ) : (
            <>
              <NavList list={guestNav} />
            </>
          )}
        </>
      ) : (
        <>
          {location.pathname === '/register' || location.pathname === '/login' ? (
            ''
          ) : (
            <>
              <NavList list={nav} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Nav
