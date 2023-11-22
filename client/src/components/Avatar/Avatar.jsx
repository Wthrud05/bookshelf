import React from 'react'
import styles from './Avatar.module.scss'
import {userInfo} from '../../utils/userData'
import {useSelector} from 'react-redux'

const Avatar = () => {
  const bookCount = useSelector((state) => state.books.booksCount)
  const currentStatus = userInfo.reduce((acc, curr) => {
    if (bookCount >= curr.books[0] && bookCount <= curr.books[1]) {
      acc = curr
    }
    return acc
  }, {})

  return (
    <div className={styles.Avatar}>
      <img src={`../../${currentStatus.img}`} alt="avatar" />
      <span>{currentStatus.status}</span>
    </div>
  )
}

export default Avatar
