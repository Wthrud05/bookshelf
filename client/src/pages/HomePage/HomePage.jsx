import React, {useEffect} from 'react'
import styles from './HomePage.module.scss'
import Controls from '../../components/Controls/Controls'
import {useAuth} from '../../hooks/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import {getBooksThunk, setSearchStr} from '../../redux/books/slice'
import {setSortType} from '../../redux/books/slice'
import Modal from '../../components/Modal/Modal'
import AddBookForm from '../../components/AddBookForm/AddBookForm'
import BookList from '../../components/BookList/BookList'
import BookLoader from '../../components/BookLoader/BookLoader'

const HomePage = () => {
  const {user} = useAuth()

  const dispatch = useDispatch()
  const {books, status, booksCount, currentBooksCount} = useSelector((state) => state.books)
  const {sortType, searchType, searchStr} = useSelector((state) => state.books)

  const getBooks = () => {
    user && sortType
      ? dispatch(getBooksThunk({id: user.id, sortType, str: searchStr, searchType: searchType}))
      : null
  }

  useEffect(() => {
    dispatch(setSortType({sortType: JSON.parse(localStorage.getItem('sort'))}))
    dispatch(setSearchStr({str: ''}))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      getBooks()
    }, 100)
  }, [sortType, searchStr])

  return (
    <div className={styles.HomePage}>
      <h1>Мои книги</h1>
      <span className={styles.Count}>
        {currentBooksCount} / {booksCount}
      </span>
      <Controls />
      {status === 'loading' ? (
        <div className={styles.Loader}>
          <h1>Загрузка…</h1>
          <BookLoader w={'50px'} h={'50px'} black={true} />
        </div>
      ) : (
        <BookList books={books} />
      )}
      <Modal>
        <AddBookForm />
      </Modal>
    </div>
  )
}

export default HomePage
