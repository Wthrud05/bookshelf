import React, {useCallback, useRef, useState} from 'react'
import styles from './BookSearch.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setSearchStr} from '../../redux/books/slice'
import {debounce} from 'lodash'
import {searchTypes} from '../../utils/data'
import {useClickOutside} from '../../hooks/useClickOutside'
import Search from '../../assets/book-search.svg?react'
import arrow from '../../assets/arrow-down-black.svg'
import SearchItem from '../SearchItem/SearchItem'

const BookSearch = () => {
  const dispatch = useDispatch()
  const {searchType} = useSelector((state) => state.books)

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

  return (
    <div className={styles.BookSearch}>
      <input
        value={value}
        onChange={(e) => inputChangeHander(e)}
        type="text"
        placeholder="Найти книгу"
      />
      <Search className={styles.Search} />
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