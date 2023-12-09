import React from 'react'
import styles from './BookList.module.scss'
import Book from '../Book/Book'
import {useSelector} from 'react-redux'
import BookLoader from '../BookLoader/BookLoader'

const BookList = ({books}) => {
  const {loading} = useSelector((state) => state.books)

  return (
    <div className={styles.BookList}>
      {books.map((book, id) => (
        <Book key={id} book={book} />
      ))}
    </div>
  )
}

export default BookList
