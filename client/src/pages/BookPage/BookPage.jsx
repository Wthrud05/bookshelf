import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styles from './BookPage.module.scss'
import Modal from '../../components/Modal/Modal'
import BookLoader from '../../components/BookLoader/BookLoader'
import {useDispatch, useSelector} from 'react-redux'
import {close} from '../../redux/modal/slice'
import {
  deleteBookThunk,
  getBookThunk,
  setError,
  setIsTouched,
  setIsUpdate,
  updateBookThunk,
} from '../../redux/book/slice'
import Cover from './Cover/Cover'
import Placeholder from './Placeholder/Placeholder'
import Info from './Info/Info'
import {motion} from 'framer-motion'

const BookPage = () => {
  const {id} = useParams()

  const dispatch = useDispatch()
  const navigator = useNavigate()

  const {book, loading} = useSelector((state) => state.book)

  const getBook = () => {
    try {
      dispatch(getBookThunk(id))
    } catch (error) {
      console.log(error)
    }
  }

  const updateBook = () => {
    try {
      dispatch(updateBookThunk(book))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBook = async () => {
    dispatch(close())
    try {
      dispatch(deleteBookThunk({id, navigator}))
    } catch (error) {
      console.log(error)
    }
  }

  const cancelHandler = () => {
    dispatch(setIsUpdate({isUpdate: false}))
    getBook()
    dispatch(setError({error: ''}))
  }

  useEffect(() => {
    getBook()
    dispatch(setError({error: ''}))
    dispatch(setIsUpdate({isUpdate: false}))
    dispatch(setIsTouched(false))
  }, [])

  return (
    <>
      {book ? (
        <motion.div
          className={styles.BookPage}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
        >
          {loading ? (
            <div className={styles.Loader}>
              <h1>Загрузка…</h1>
              <BookLoader w={'50px'} h={'50px'} black={true} />
            </div>
          ) : (
            <>
              {book.cover ? <Cover /> : <Placeholder />}
              <Info updateBook={updateBook} cancel={cancelHandler} />
            </>
          )}
          <Modal>
            <div className={styles.ModalDelete}>
              <h3>Вы действительно хотите удалить книгу?</h3>
              <div className={styles.ModalButtons}>
                <button onClick={deleteBook}>Да</button>
                <button className={styles.Del} onClick={() => dispatch(close())}>
                  Отмена
                </button>
              </div>
            </div>
          </Modal>
        </motion.div>
      ) : (
        <div>
          <h1 style={{fontSize: '24px', textAlign: 'center', marginTop: '20px'}}>
            Произошла ошибка при загрузке книги
          </h1>
        </div>
      )}
    </>
  )
}

export default BookPage
