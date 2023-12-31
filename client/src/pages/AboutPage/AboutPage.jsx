import React, {useRef} from 'react'
import styles from './AboutPage.module.scss'
import {motion} from 'framer-motion'
import logo from '../../assets/Logo-white.svg'
import bs from '../../assets/bs.svg'
import addBook from '../../assets/add_book.svg'
import updBook from '../../assets/upd-book.svg'
import sub from '../../assets/sub.svg'
import share from '../../assets/share.svg'
import booksV from '../../assets/books-v.svg'
import booksH from '../../assets/books-h.svg'
import {NavLink} from 'react-router-dom'

const About = () => {
  return (
    <motion.div
      className={styles.AboutPage}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.2}}
    >
      <div className={styles.FirstScreen}>
        <motion.img
          initial={{opacity: 0, y: '-50px'}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 1}}
          src={logo}
          alt="logo"
        />
        <motion.p
          initial={{opacity: 0, y: '100px'}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 1}}
        >
          Bookshelf — это приложение, где вы можете удобно сохранять все свои прочитанные книги и
          аудиокниги, а также поделиться коллекцией с друзьями.
        </motion.p>
      </div>
      <div className={styles.SecondScreen}>
        <img className={styles.BooksV} src={booksV} alt="books" />
        <img className={styles.BooksV} src={booksV} alt="books" />
        <img className={styles.BooksH} src={booksH} alt="books" />
        <img className={styles.BooksH} src={booksH} alt="books" />

        <div className={styles.Header}>
          <motion.img
            initial={{opacity: 0, right: '-100px'}}
            whileInView={{opacity: 1, right: 0}}
            transition={{duration: 0.8}}
            src={bs}
            alt="bs"
          />
          <motion.h1
            initial={{opacity: 1, y: '100px'}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
          >
            Создайте свою электронную книжную полку!
          </motion.h1>
          <motion.img
            initial={{opacity: 0, left: '-100px'}}
            whileInView={{opacity: 1, left: 0}}
            transition={{duration: 0.8}}
            src={bs}
            alt="bs"
          />
        </div>

        <motion.div
          initial={{opacity: 0, y: '150px'}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className={styles.Section}
        >
          <div>
            <img src={addBook} alt="add_book" />
            <h3>Добавляйте прочитанные книги в коллекцию</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: '150px'}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          className={styles.Section}
        >
          <div>
            <img src={updBook} alt="upd_book" />
            <h3>Редактируйте и удаляйте книги в вашей коллекции</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: '150px'}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.7}}
          className={styles.Section}
        >
          <div>
            <img src={sub} alt="sub" />
            <h3>Подпишитесь на своих друзей и следите за их обновлениями</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: '150px'}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className={styles.Section}
        >
          <div>
            <img src={share} alt="share" />
            <h3>Делитесь своими успехами с друзьями</h3>
          </div>
        </motion.div>

        <motion.button
          initial={{rotate: 0, scale: 1, y: '100px'}}
          whileHover={{scale: 1.05}}
          whileInView={{y: 0}}
          whileTap={{scale: 0.95}}
          transition={{duration: 0.1}}
        >
          <NavLink to={'/'}>Начать</NavLink>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default About
