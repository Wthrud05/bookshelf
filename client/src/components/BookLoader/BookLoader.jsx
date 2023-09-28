import React from 'react'
import styles from './BookLoader.module.scss'

const BookLoader = ({w, h}) => {
  return (
    <div style={{width: w, height: h}} className={styles.Loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default BookLoader
