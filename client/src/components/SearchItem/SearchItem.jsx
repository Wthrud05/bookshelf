import React, {useEffect} from 'react'
import styles from './SearchItem.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setSearchType} from '../../redux/books/slice'
import {useAuth} from '../../hooks/useAuth'

const SearchItem = ({type}) => {
  const dispatch = useDispatch()
  const {searchType} = useSelector((state) => state.books)

  return (
    <li
      onClick={() => dispatch(setSearchType({searchType: type}))}
      className={searchType === type ? styles.SearchItemActive : styles.SearchItem}
    >
      {type}
    </li>
  )
}

export default SearchItem
