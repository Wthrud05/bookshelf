import React, {useRef, useState} from 'react'
import styles from './AddBookForm.module.scss'
import axios from 'axios'
import {useAuth} from '../../hooks/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import {setLoading, setNewBook, setError} from '../../redux/new_book/slice'
import {setBooks} from '../../redux/books/slice'
import {close} from '../../redux/modal/slice'
import BookLoader from '../BookLoader/BookLoader'
import iTitle from '../../assets/title.svg'
import iAauthor from '../../assets/user.svg'
import iDate from '../../assets/date-grey.svg'
import iAbout from '../../assets/about-grey.svg'
import iCheck from '../../assets/check.svg'
import audiobook from '../../assets/audiobook.svg'
import audiobookGrey from '../../assets/audiobook-grey.svg'
import cross from '../../assets/cross.svg'

const AddBookForm = () => {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books.books)
  const loading = useSelector((state) => state.newBook.loading)
  const error = useSelector((state) => state.newBook.error)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [isAudio, setIsAudio] = useState(false)
  const [description, setDescription] = useState('')

  const [file, setFile] = useState('')
  const [preview, setPreview] = useState('')

  const {user} = useAuth()

  const inputRef = useRef(null)

  const uploadPrviewHandler = (e) => {
    const file = e.target.files[0]
    setFile(file)

    const blob = URL.createObjectURL(file)
    setPreview(blob)
    console.log(blob)
  }

  const uploadFileHandler = async (file) => {
    try {
      console.log(file)
      const formData = new FormData()
      formData.append('files', file)
      console.log(formData.get('files'))

      // https://bookshelf-server-blush.vercel.app/api/uploads
      // http://localhost:5000/api/uploads

      return await axios.post('http://localhost:5000/api/uploads', formData, {
        headers: 'multipart/form-data',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const createBookHandler = async () => {
    dispatch(setLoading({loading: true}))

    try {
      let cover = ''

      if (file.length !== 0) {
        const response = await uploadFileHandler(file)
        console.log(response)
        cover = await response.data.url
      } else {
        cover = ''
      }

      const book = {
        title: title,
        author: author,
        user_id: user.id,
        cover: cover,
        read_date: date,
        isAudio: isAudio,
        description: description,
      }

      // https://bookshelf-server-blush.vercel.app/api/books-create
      // http://localhost:5000/api/books-create

      const {data} = await axios.post(
        'https://bookshelf-server-blush.vercel.app/api/books-create',
        book,
      )

      console.log(data)

      const newBook = data.book
      console.log(newBook)

      dispatch(setNewBook({book: newBook}))

      const items = [...books, newBook]

      dispatch(setBooks({books: items}))
      dispatch(close())

      setTitle('')
      setAuthor('')
      setDate('')
      setDescription('')
      setIsAudio(false)
      setFile('')
      setPreview('')
      inputRef.current.value = ''
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading({loading: false}))
    }
  }

  return (
    <div className={styles.AddBookForm}>
      {loading ? (
        <div className={loading ? styles.Loader + ' ' + styles.Loading : styles.Loader}>
          <BookLoader w={'40px'} h={'40px'} black={true} />
          <h1>Загрузка...</h1>
        </div>
      ) : (
        ''
      )}
      <h3>Добавить книгу</h3>
      <div className={styles.Wrapper}>
        <div className={styles.InputBox}>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <img src={iTitle} alt="title" />
        </div>
        <div className={styles.InputBox}>
          <input
            type="text"
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <img src={iAauthor} alt="author" />
        </div>
        <div className={styles.InputBox}>
          <input
            type="text"
            placeholder="Дата"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <img src={iDate} alt="date" />
        </div>
        <div className={styles.InputBox}>
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <img src={iAbout} alt="about" />
        </div>
        <input
          type="file"
          hidden
          ref={inputRef}
          onChange={uploadPrviewHandler}
          accept="image/png, image/jpg, image/jpeg"
        />
        <button onClick={() => inputRef.current.click()}>Добавить обложку</button>
        <div className={styles.Options}>
          <div className={styles.Cover}>
            {preview.length ? (
              <div className={styles.UserPreview}>
                <img src={preview} alt="preview" />
                <button
                  className={styles.Cross}
                  onClick={() => {
                    setPreview('')
                    inputRef.current.value = ''
                  }}
                >
                  <img src={cross} alt="cross" />
                </button>
              </div>
            ) : (
              <div className={styles.Preview}>
                <h4>{title}</h4>
                <div></div>
                <span>{author}</span>
              </div>
            )}
          </div>
          <div className={styles.isAudio}>
            {isAudio ? (
              <img src={audiobook} alt="audiobook" />
            ) : (
              <img src={audiobookGrey} alt="audiobook" />
            )}
            <span>Это аудио книга{isAudio ? '!' : '?'}</span>
            <div className={styles.Checkbox} onClick={() => setIsAudio((prev) => !prev)}>
              <img
                src={iCheck}
                className={isAudio ? styles.Check + ' ' + styles.Checked : styles.Check}
              ></img>
            </div>
          </div>
        </div>
        <div className={styles.Buttons}>
          <button
            className={styles.AddBook}
            disabled={title.length < 3 || author.length < 3}
            onClick={createBookHandler}
          >
            {loading ? 'Loading...' : 'Добавить книгу'}
          </button>
          <button className={styles.Cancel}>Отмена</button>
        </div>
      </div>
    </div>
  )
}

export default AddBookForm
