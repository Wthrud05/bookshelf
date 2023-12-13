import React, {useEffect} from 'react'
import styles from './HomePage.module.scss'
import Controls from '../../components/Controls/Controls'
import {useAuth} from '../../hooks/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {setBooks, setBooksCount, setCurrentBooksCount, setLoading} from '../../redux/books/slice'
import Modal from '../../components/Modal/Modal'
import AddBookForm from '../../components/AddBookForm/AddBookForm'
import BookList from '../../components/BookList/BookList'
import BookLoader from '../../components/BookLoader/BookLoader'
import {sortByType} from '../../utils/helpers'
import {setSortType} from '../../redux/user/slice'

const HomePage = () => {
  const {user} = useAuth()

  const dispatch = useDispatch()
  const {books, loading, booksCount, currentBooksCount} = useSelector((state) => state.books)
  const {sortType} = useSelector((state) => state.user)

  const getBooks = async () => {
    dispatch(setLoading({loading: true}))
    try {
      const {data} = await axios.post('https://bookshelf-server-blush.vercel.app/api/books', {
        id: user.id,
      })
      const items = await data.books
      const sortedBooks = sortByType(sortType, items)
      console.log(sortedBooks)

      dispatch(setBooks({books: sortByType(sortType, items)}))
      dispatch(setBooksCount({booksCount: items.length}))
      dispatch(setCurrentBooksCount({currentBooksCount: sortedBooks.length}))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading({loading: false}))
      if (!books) {
        console.log('Try Again!!!')
      }
    }
  }

  useEffect(() => {
    sortType ? getBooks() : null
  }, [sortType])

  return (
    <div className={styles.HomePage}>
      <h1>Мои книги</h1>
      <span className={styles.Count}>
        {currentBooksCount} / {booksCount}
      </span>
      <Controls />
      {loading ? (
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
