import React, {useState} from 'react'
import NavItem from '../NavItem/NavItem'
import {motion} from 'framer-motion'
import styles from './NavList.module.scss'

const NavList = ({list}) => {
  const [isOpen, setIsOpen] = useState(false)
  const variants = {
    open: {transform: 'translate(0%, 0px)'},
    closed: {transform: 'translate(100%, 0px)'},
  }

  return (
    <div className={styles.NavList}>
      <ul className={styles.DesktopNavList}>
        {list.map((i) => (
          <NavItem key={i.name} name={i.name} path={i.path} icon={i.icon} />
        ))}
      </ul>
      <motion.ul
        className={styles.MobileNavList}
        animate={isOpen ? 'open' : 'closed'}
        transition={{type: 'spring', duration: 0.5}}
        variants={variants}
      >
        {list.map((i) => (
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
    </div>
  )
}

export default NavList
