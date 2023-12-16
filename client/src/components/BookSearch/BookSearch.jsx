import React, {useCallback, useEffect, useRef, useState} from 'react'
import styles from './BookSearch.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getBooksThunk, setSearchStr} from '../../redux/books/slice'
import {useAuth} from '../../hooks/useAuth'
import {debounce} from 'lodash'
import {searchTypes, sortTypes} from '../../utils/data'
import search from '../../assets/book-search.svg'
import arrow from '../../assets/arrow-down-black.svg'
import SortItem from '../SortItem/SortItem'
import SearchItem from '../SearchItem/SearchItem'
import {useClickOutside} from '../../hooks/useClickOutside'

const BookSearch = () => {
  const dispatch = useDispatch()
  const {user} = useAuth()
  console.log(user)
  const {searchStr, sortType, searchType} = useSelector((state) => state.books)

  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const typeRef = useRef(null)

  const inputChangeHander = (e) => {
    setValue(e.target.value)
    searchBookHandler(e.target.value)
  }

  const searchBookHandler = useCallback(
    debounce((str) => {
      dispatch(setSearchStr({str: str}))
    }, 500),
    [],
  )

  useClickOutside(typeRef, () => {
    setIsOpen(false)
  })

  const clearInputHandler = () => {
    setValue('')
    dispatch(setSearchStr({str: ''}))
  }

  useEffect(() => {
    user
      ? dispatch(getBooksThunk({id: user.id, sortType, str: value, searchType: searchType}))
      : null
  }, [searchStr])

  return (
    <div className={styles.BookSearch}>
      <img className={styles.Search} src={search} alt="search" />
      <input
        value={value}
        onChange={(e) => inputChangeHander(e)}
        type="text"
        placeholder="Найти книгу"
      />
      <div className={styles.SearchType} ref={typeRef} onClick={() => setIsOpen(!isOpen)}>
        <span>{searchType}</span>
        <img src={arrow} alt="arrow" />
        {isOpen && (
          <ul className={styles.SearchList}>
            {searchTypes.map((type) => (
              <SearchItem key={type} type={type} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BookSearch
