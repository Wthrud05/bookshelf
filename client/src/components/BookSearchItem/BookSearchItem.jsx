import React, {useEffect, useState} from 'react'
import styles from './BookSearchItem.module.scss'
import Title from '../../assets/title.svg?react'
import Author from '../../assets/user.svg?react'
import Date from '../../assets/date-grey.svg?react'
import About from '../../assets/about-grey.svg?react'
import iCheck from '../../assets/check.svg'
import {useAuth} from '../../hooks/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import {createBookThunk} from '../../redux/new_book/slice'
import BookLoader from '../BookLoader/BookLoader'
import {setBooks, setBooksCount} from '../../redux/books/slice'

const BookSearchItem = ({book}) => {
  const cover = book.volumeInfo.imageLinks?.thumbnail
    ? book.volumeInfo.imageLinks?.thumbnail
    : book.volumeInfo.imageLinks?.smallThumbnail

  const {user} = useAuth()

  const dispatch = useDispatch()

  const {books, booksCount} = useSelector((state) => state.books)
  const {loading, error} = useSelector((state) => state.newBook)

  const [isChoosen, setIsChoosen] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [isAudio, setIsAudio] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    setTitle(book.volumeInfo.title)
    setAuthor(book.volumeInfo.authors)
    setDescription(book.volumeInfo.description)
    setDate('')
    setIsAudio(false)
  }, [isChoosen])

  const createBook = async () => {
    try {
      const book = {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        author: author
          .toString()
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        user_id: user.id,
        cover: cover + '&w=1280',
        read_date: date,
        isAudio: isAudio,
        description: description,
      }

      dispatch(createBookThunk(book)).then((res) => {
        const newBook = res.payload
        const items = [newBook, ...books]

        dispatch(setBooks({books: items}))
        dispatch(setBooksCount({booksCount: booksCount + 1}))
        setIsChoosen(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={isChoosen ? `${styles.BookSearchItem} + ${styles.Choosen}` : styles.BookSearchItem}
    >
      <div className={styles.Cover}>
        {cover ? (
          <img src={cover + '&w=1280'} alt={book.volumeInfo.title} />
        ) : (
          <div className={styles.Placeholder}>
            <h1>{book.volumeInfo.title}</h1>
            <span>{book.volumeInfo?.authors}</span>
          </div>
        )}
      </div>
      <div className={styles.Info}>
        {isChoosen ? (
          <div className={styles.InputBox}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название"
            />
            <Title className={styles.Icon} />
          </div>
        ) : (
          <h1>{book.volumeInfo.title}</h1>
        )}
        {isChoosen ? (
          <div className={styles.InputBox}>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Автор"
            />
            <Author className={styles.Icon} />
          </div>
        ) : (
          <span>{book.volumeInfo?.authors}</span>
        )}
        {isChoosen && (
          <div className={styles.InputBox}>
            <input
              type="text"
              placeholder="Дата"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Date className={styles.Icon} />
          </div>
        )}
        {isChoosen ? (
          <div className={styles.InputBox}>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <About className={styles.Icon} />
          </div>
        ) : (
          <p>{book.volumeInfo.description}</p>
        )}
        {isChoosen && (
          <div className={styles.Checkbox} onClick={() => setIsAudio((prev) => !prev)}>
            <img
              src={iCheck}
              className={isAudio ? styles.Check + ' ' + styles.Checked : styles.Check}
            ></img>
            <span>{isAudio ? 'Аудиокнига!' : 'Аудиокнига?'}</span>
          </div>
        )}

        <div className={styles.Buttons}>
          {isChoosen ? (
            <>
              {loading ? (
                <BookLoader black={true} w={'35px'} h={'35px'} />
              ) : (
                <>
                  <button onClick={createBook}>Подтвердить</button>
                  <button onClick={() => setIsChoosen((prev) => !prev)}>Отмена</button>
                </>
              )}
            </>
          ) : (
            <>
              <button onClick={() => setIsChoosen((prev) => !prev)}>Добавить</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookSearchItem
