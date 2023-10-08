import React, {useEffect} from 'react'
import styles from './HomePage.module.scss'
import Controls from '../../components/Controls/Controls'
import {useAuth} from '../../hooks/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {setBooks} from '../../redux/books/slice'
import Book from '../../components/Book/Book'

const HomePage = () => {
  const {user} = useAuth()

  const dispatch = useDispatch()
  const books = useSelector((state) => state.books.books)

  const getBooks = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/books', {id: user.id})
      const items = await res.data.books
      dispatch(setBooks(items))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(user.id)
    getBooks()
  }, [])

  return (
    <div className={styles.HomePage}>
      <h1>Мои книги</h1>
      <Controls />
      <div className={styles.BooksList}>
        {books.map((book) => (
          <Book book={book} key={book.book_id} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
