import React from 'react'
import styles from './Book.module.scss'
import {Link, useLocation} from 'react-router-dom'
import headphones from '../../assets/headphones.svg'
import {motion} from 'framer-motion'
import {useInView} from 'react-intersection-observer'

const Book = ({book}) => {
  const navigation = useLocation()
  const isUser = navigation.pathname === '/' ? true : false

  const {ref, inView} = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{scale: 1}}
      whileTap={{
        scale: 0.95,
        y: '-15px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)',
      }}
      whileHover={{
        scale: 1.02,
        y: '-15px',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.7)',
      }}
      transition={{duration: 0.05}}
      className={styles.Book}
    >
      {inView ? (
        <Link ref={ref} to={isUser ? `/book/${book.book_id}` : ''}>
          {book.isaudio && <img className={styles.Audio} src={headphones} alt="audio" />}
          {book.cover ? (
            <>
              <div className={styles.Icon}>
                <span className={styles.ReadDate}>{book.read_date}</span>
                {isUser && (
                  <svg
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15,10 L15,14 C15,15.1045695 14.1045695,16 13,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,3 C0,1.8954305 0.8954305,1 2,1 L6,1 L6,3 L2,3 L2,14 L13,14 L13,10 L15,10 Z M13.9971001,3.41421356 L7.70420685,9.70710678 L6.28999329,8.29289322 L12.5828865,2 L8.99710007,2 L8.99710007,0 L15.9971001,0 L15.9971001,7 L13.9971001,7 L13.9971001,3.41421356 Z"
                      fillRule="evenodd"
                      fill="#fff"
                    />
                  </svg>
                )}
                <h4>{book.title}</h4>
              </div>
              <img src={`${book.cover}`} alt="cover" />
            </>
          ) : (
            <div className={styles.Placeholder}>
              <div className={styles.Icon}>
                {isUser && (
                  <svg
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15,10 L15,14 C15,15.1045695 14.1045695,16 13,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,3 C0,1.8954305 0.8954305,1 2,1 L6,1 L6,3 L2,3 L2,14 L13,14 L13,10 L15,10 Z M13.9971001,3.41421356 L7.70420685,9.70710678 L6.28999329,8.29289322 L12.5828865,2 L8.99710007,2 L8.99710007,0 L15.9971001,0 L15.9971001,7 L13.9971001,7 L13.9971001,3.41421356 Z"
                      fillRule="evenodd"
                      fill="#fff"
                    />
                  </svg>
                )}
              </div>
              <h4>{book.title}</h4>
              <span>{book.author}</span>
            </div>
          )}
        </Link>
      ) : (
        <div></div>
      )}
    </motion.div>
  )
}

export default Book
