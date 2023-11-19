import React from 'react'
import styles from './Info.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {
  setAuthor,
  setIsUpdate,
  setTitle,
  setReadDate,
  setDescription,
  setIsTouched,
} from '../../../redux/book/slice'
import pattern from '../../../assets/pattern.jpg'
import feather from '../../../assets/feather.svg'
import iTitle from '../../../assets/title.svg'
import iAauthor from '../../../assets/user.svg'
import iDate from '../../../assets/date-grey.svg'
import iAbout from '../../../assets/about-grey.svg'
import {open} from '../../../redux/modal/slice'

const Info = ({cancel, updateBook}) => {
  const {isUpdate, error, isTouched, loading} = useSelector((state) => state.book)
  const {book} = useSelector((state) => state.book)

  const dispatch = useDispatch()

  return (
    <div className={styles.Info}>
      <div className={styles.Details}>
        {isUpdate && (
          <div className={styles.updTitle}>
            <h3>Редактировать книгу</h3>
            <img src={feather} alt="feather" />
          </div>
        )}
        {isUpdate ? (
          <div className={styles.InputBox}>
            <input
              placeholder="Название"
              type="text"
              value={book.title}
              onChange={(e) => {
                dispatch(setTitle(e.target.value))
                dispatch(setIsTouched({isTouched: true}))
              }}
            />
            <img src={iTitle} alt="title" />
          </div>
        ) : (
          <h1>{book.title}</h1>
        )}
        {isUpdate ? (
          <div className={styles.InputBox}>
            <input
              placeholder="Автор"
              type="text"
              value={book.author}
              onChange={(e) => {
                dispatch(setAuthor(e.target.value))
                dispatch(setIsTouched({isTouched: true}))
              }}
            />
            <img src={iAauthor} alt="author" />
          </div>
        ) : (
          <h3>{book.author}</h3>
        )}
        {isUpdate ? (
          <div className={styles.InputBox}>
            <input
              placeholder="Дата"
              type="text"
              value={book.read_date}
              onChange={(e) => {
                dispatch(setReadDate(e.target.value))
                dispatch(setIsTouched({isTouched: true}))
              }}
            />
            <img src={iDate} alt="date" />
          </div>
        ) : (
          <span>Прочитана: {book.read_date}</span>
        )}
        {isUpdate ? (
          <div className={styles.InputBox}>
            <textarea
              placeholder="Описание"
              type="text"
              value={book.description}
              onChange={(e) => {
                dispatch(setDescription(e.target.value))
                dispatch(setIsTouched({isTouched: true}))
              }}
            />
            <img src={iAbout} alt="about" />
          </div>
        ) : (
          <>
            <span>Описание:</span>
            <p>{book.description}</p>
            <img src={pattern} alt="pattern" />
          </>
        )}
      </div>
      {error && <span className={styles.Error}>{error}</span>}
      <div className={styles.Buttons}>
        {isUpdate ? (
          <>
            <button disabled={!isTouched || loading} onClick={updateBook}>
              Подтвердить
            </button>
            <button className={styles.Del} onClick={cancel}>
              Отмена
            </button>
          </>
        ) : (
          <>
            <button onClick={() => dispatch(setIsUpdate({isUpdate: true}))}>Изменить</button>
            <button
              onClick={() => {
                dispatch(open())
              }}
            >
              Удалить
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Info
