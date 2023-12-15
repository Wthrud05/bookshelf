import React, {useEffect} from 'react'
import styles from './SortItem.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setSortType} from '../../redux/books/slice'

const SortItem = ({category}) => {
  const dispatch = useDispatch()
  const {sortType} = useSelector((state) => state.books)

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
