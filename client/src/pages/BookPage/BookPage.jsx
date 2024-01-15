import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import styles from './BookPage.module.scss'
import Modal from '../../components/Modal/Modal'
import BookLoader from '../../components/BookLoader/BookLoader'
import {useDispatch, useSelector} from 'react-redux'
import {close} from '../../redux/modal/slice'
import {setBook, setError, setIsTouched, setIsUpdate} from '../../redux/book/slice'
import Cover from './Cover/Cover'
import Placeholder from './Placeholder/Placeholder'
import Info from './Info/Info'
import {motion} from 'framer-motion'

const BookPage = () => {
  const API_URL = import.meta.env.VITE_API_URL

  const {id} = useParams()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const book = useSelector((state) => state.book.book)

  const getBook = async () => {
    setLoading(true)
    try {
      const {data} = await axios.post(`${API_URL}/book`, {id})
      dispatch(setBook({book: data.book}))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateBook = async () => {
    setLoading(true)
    dispatch(setError({error: ''}))

    if (book.title.length < 3) {
      setLoading(false)
      dispatch(setError({error: 'Название должно содержать хотя-бы 3 символа'}))
      return
    }

    if (book.author.length < 3) {
      setLoading(false)
      dispatch(setError({error: 'Имя автора должно содержать хотя-бы 3 символа'}))
      return
    }

    try {
      const {data} = await axios.put(`${API_URL}/books`, {
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        cover: book.cover,
        read_date: book.read_date,
        description: book.description,
      })

      dispatch(setBook({book: data.book}))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      dispatch(setIsUpdate({isUpdate: false}))
      dispatch(setIsTouched(false))
    }
  }

  const deleteBook = async () => {
    setLoading(true)
    dispatch(close())
    try {
      await axios.delete(`${API_URL}/books`, {
        data: {id: id},
      })
      navigate('/')
    } catch (error) {
      dispatch(setError({error: 'Произошла ошибка при удалении книги'}))
    } finally {
      setLoading(false)
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
              <h1>Загрузка...</h1>
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
        <h1>Произошла ошибка!</h1>
      )}
    </>
  )
}

export default BookPage
