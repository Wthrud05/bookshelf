import React, {useEffect} from 'react'
import styles from './HomePage.module.scss'
import Controls from '../../components/Controls/Controls'
import {useAuth} from '../../hooks/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import {getBooksThunk} from '../../redux/books/slice'
import {motion} from 'framer-motion'
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
    getBooks()
  }, [sortType, searchStr])

  return (
    <motion.div
      className={styles.HomePage}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.2}}
    >
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
    </motion.div>
  )
}

export default HomePage
