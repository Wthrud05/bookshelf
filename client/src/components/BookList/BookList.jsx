import React from 'react'
import styles from './BookList.module.scss'
import Book from '../Book/Book'
import {useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import noBooks from '../../assets/no-books.svg'
import reload from '../../assets/reload.svg'

const BookList = ({books}) => {
  const {error} = useSelector((state) => state.books)

  const reladPageHandler = () => {
    location.reload()
  }

  return (
    <div className={styles.BookList}>
      {error ? (
        <>
          <div className={styles.Error}>
            <h2>{error}</h2>
            <p>Попробуйте перезгрузить страницу</p>
            <motion.button
              onClick={reladPageHandler}
              initial={{rotate: 0}}
              whileTap={{rotate: '360deg', scale: 1.2}}
              whileHover={{scale: 1.2}}
              exit={{rotate: 0}}
            >
              <img src={reload} alt="reload" />
            </motion.button>
          </div>
        </>
      ) : (
        <>
          {books.length ? (
            <>
              {books.map((book, id) => (
                <Book key={id} book={book} />
              ))}
            </>
          ) : (
            <div className={styles.NoBooks}>
              <h2>Книг пока нет…</h2>
              <img src={noBooks} alt="no-books" />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BookList
