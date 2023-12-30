import React, {useEffect, useState} from 'react'
import NavItem from '../NavItem/NavItem'
import styles from './Nav.module.scss'
import {AnimatePresence, MotionConfig, motion} from 'framer-motion'
import {useLocation} from 'react-router-dom'
import {useGuest} from '../../hooks/useGuest'
import {nav, guestNav} from '../../utils/data'

const Nav = () => {
  const location = useLocation()
  const isGuest = useGuest()

  const [isOpen, setIsOpen] = useState(false)

  const variants = {
    open: {transform: 'translate(0%, 0px)'},
    closed: {transform: 'translate(100%, 0px)'},
  }

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
            <ul>
              {guestNav.map((i) => (
                <NavItem key={i.name} name={i.name} path={i.path} icon={i.icon} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          {location.pathname === '/register' || location.pathname === '/login' ? (
            ''
          ) : (
            <>
              <ul className={styles.NavList}>
                {nav.map((i) => (
                  <NavItem key={i.name} name={i.name} path={i.path} icon={i.icon} />
                ))}
              </ul>
              <motion.ul
                className={styles.MobileNavList}
                animate={isOpen ? 'open' : 'closed'}
                transition={{type: 'spring', duration: 0.5}}
                variants={variants}
              >
                {nav.map((i) => (
                  <NavItem
                    key={i.name}
                    name={i.name}
                    path={i.path}
                    icon={i.icon}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                ))}
              </motion.ul>
              <div onClick={() => setIsOpen(!isOpen)} className={styles.Burger}>
                <div
                  style={{
                    transform: isOpen && 'rotate(-45deg) translate(0, 10px)',
                  }}
                ></div>
                <div
                  style={{
                    transform: isOpen && 'translate(30px, 0) rotate(90deg)',
                    opacity: isOpen && 0,
                  }}
                ></div>
                <div
                  style={{
                    transform: isOpen && 'rotate(45deg) translate(0, -10px)',
                  }}
                ></div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Nav
