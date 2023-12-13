import React from 'react'
import styles from './Avatar.module.scss'
import {userInfo} from '../../utils/data'

const Avatar = ({count}) => {
  const currentStatus = userInfo.reduce((acc, curr) => {
    if (count >= curr.books[0] && count <= curr.books[1]) {
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
