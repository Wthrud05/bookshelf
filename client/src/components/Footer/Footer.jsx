import React from 'react'
import github from '../../assets/github.svg'
import styles from './Footer.module.scss'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <Link target="blank" to={'https://github.com/Wthrud05/'}>
        <img src={github} alt="github" />
      </Link>
      <span>Лобыкин Александр 2023</span>
    </div>
  )
}

export default Footer
