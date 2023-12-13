import React, {useEffect} from 'react'
import styles from './SortItem.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setSortType} from '../../redux/user/slice'

const SortItem = ({category = 'Новые', handler}) => {
  const dispatch = useDispatch()
  const {sortType} = useSelector((state) => state.user)

  return (
    <li
      onClick={() => {
        dispatch(setSortType({sortType: category}))
        localStorage.setItem('sort', JSON.stringify(category))
      }}
      className={sortType === category ? styles.SortItemActive : styles.SortItem}
    >
      {category}
    </li>
  )
}

export default SortItem
