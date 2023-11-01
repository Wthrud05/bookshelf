import React, {useEffect, useState} from 'react'
import styles from './Error.module.scss'
import {useSelector} from 'react-redux'
import cross from '../../assets/cross-black.svg'

const Error = ({children}) => {
  const error = useSelector((state) => state.newBook.error)
  const [isOpen, setIsOpen] = useState(false)

  console.log(error)

  useEffect(() => {
    error.length ? setIsOpen(true) : setIsOpen(false)
    setTimeout(() => setIsOpen(false), 3000)
  }, [error])

  console.log(isOpen)

  return (
    <div className={isOpen ? styles.Error + ' ' + styles.Show : styles.Error}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={cross} alt="cross" />
      </button>
      {children}
    </div>
  )
}

export default Error
