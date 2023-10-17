import React from 'react'
import styles from './BookLoader.module.scss'

const BookLoader = ({w, h, black = false}) => {
  return (
    <div style={{width: w, height: h}} className={black ? styles.LoaderBlack : styles.Loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default BookLoader
