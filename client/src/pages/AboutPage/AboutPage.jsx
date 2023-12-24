import React, {useRef} from 'react'
import styles from './AboutPage.module.scss'
import {motion, useInView} from 'framer-motion'
import title from '../../assets/aboutpage-title.svg'
import bs from '../../assets/bs.svg'
import addBook from '../../assets/add_book.svg'
import updBook from '../../assets/upd-book.svg'
import sub from '../../assets/sub.svg'
import share from '../../assets/share.svg'

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
          src={title}
          alt="title"
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
        <motion.div
          initial={{opacity: 0, y: '100px'}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className={styles.Header}
        >
          <img src={bs} alt="bs" />
          <h1>Создайте свою электронную книжную полку!</h1>
        </motion.div>
        <div className={styles.Section}>
          <motion.div
            initial={{opacity: 0, x: '-100%'}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
          >
            <img src={addBook} alt="add_book" />
            <h3>Добавляйте прочитанные книги в колеекцию</h3>
          </motion.div>
          <motion.div
            initial={{opacity: 0, x: '100%'}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
          >
            <img src={updBook} alt="upd_book" />
            <h3>Редактируйте и удаляйте книги в вашей коллекции</h3>
          </motion.div>
        </div>
        <div className={styles.Section}>
          <motion.div
            initial={{opacity: 0, x: '-100%'}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 1}}
          >
            <img src={sub} alt="sub" />
            <h3>Подпишитесь на своих друзей и следите за их обновлениями</h3>
          </motion.div>
          <motion.div
            initial={{opacity: 0, x: '100%'}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 1}}
          >
            <img src={share} alt="share" />
            <h3>Делитесь своими успехами с друзьями</h3>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
