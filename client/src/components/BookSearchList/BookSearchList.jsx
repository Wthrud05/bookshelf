import React from 'react'
import styles from './BookSearchList.module.scss'
import {useSelector} from 'react-redux'
import BookLoader from '../../components/BookLoader/BookLoader'
import BookSearchItem from '../BookSearchItem/BookSearchItem'

const BookSearchList = () => {
  const {books, isLoading} = useSelector((state) => state.searchBooks)

  return (
    <div className={styles.BookSearchList}>
      {isLoading ? (
        <div className={styles.Loader}>
          <h2>Загрузка…</h2>
          <BookLoader w={'30px'} h={'30px'} black={true} />
        </div>
      ) : (
        <>
          {books && (
            <div className={styles.List}>
              {books.map((book) => (
                <BookSearchItem key={book.id} book={book} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BookSearchList
