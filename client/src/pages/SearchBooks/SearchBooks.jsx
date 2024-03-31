import React, {useEffect, useState} from 'react'
import styles from './SearchBooks.module.scss'
import Search from '../../assets/book-search.svg?react'
import {useDispatch, useSelector} from 'react-redux'
import {getSearchedBooksThunk, setBooks, setSearchStr} from '../../redux/search_books/slice'
import BookSearchList from '../../components/BookSearchList/BookSearchList'

const SearchBook = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const {searchStr} = useSelector((state) => state.searchBooks)

  const changeInputHander = (e) => {
    setValue(e.target.value)
    dispatch(setSearchStr({str: e.target.value}))
  }

  const getBooks = (query) => {
    if (!query) return

    dispatch(getSearchedBooksThunk(query))
    dispatch(setSearchStr({str: ''}))
  }

  const handleKeyPress = (e, query) => {
    if (e.key === 'Enter') {
      getBooks(query)
    }
  }

  useEffect(() => {
    dispatch(setBooks({books: []}))
  }, [])

  return (
    <div className={styles.SearchBooks}>
      <h1>Поиск книг</h1>
      <div className={styles.Search}>
        <input
          value={value}
          onChange={(e) => changeInputHander(e)}
          onKeyDown={(e) => handleKeyPress(e, searchStr)}
          type="text"
          placeholder="Название или автор"
        />
        <Search className={styles.SearchIcon} />
        <button onClick={() => getBooks(searchStr)}>Найти</button>
      </div>
      <BookSearchList />
    </div>
  )
}

export default SearchBook
