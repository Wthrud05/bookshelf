import React from 'react'
import styles from './SortItem.module.scss'

const SortItem = ({title, handler}) => {
  return <li className={styles.SortItem}>{title}</li>
}

export default SortItem
