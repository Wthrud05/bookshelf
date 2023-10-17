import React from 'react'
import styles from './Book.module.scss'
import {Link} from 'react-router-dom'

const Book = ({book}) => {
  return (
    <div className={styles.Book}>
      <Link to={`/book/${book.book_id}`}>
        {book.cover ? (
          <img src={`https://bookshelf-server-blush.vercel.app/api${book.cover}`} alt="cover" />
        ) : (
          <div className={styles.Placeholder}>
            <h4>{book.title}</h4>
            <span>{book.author}</span>
          </div>
        )}
      </Link>
    </div>
  )
}

export default Book
