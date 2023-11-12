import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import styles from './BookPage.module.scss'
import Modal from '../../components/Modal/Modal'
import BookLoader from '../../components/BookLoader/BookLoader'
import {useDispatch, useSelector} from 'react-redux'
import {open, close} from '../../redux/modal/slice'
import {setBook, setError} from '../../redux/book/slice'
import pattern from '../../assets/pattern.jpg'
import iTitle from '../../assets/title.svg'
import iAauthor from '../../assets/user.svg'
import iDate from '../../assets/date-grey.svg'
import iAbout from '../../assets/about-grey.svg'
import feather from '../../assets/feather.svg'

const BookPage = () => {
  const updUrl = import.meta.env.VITE_UPLOAD_IMG_URL

  const {id} = useParams()
  const [localBook, setLocalBook] = useState({})
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [cover, setCover] = useState('')

  const [file, setFile] = useState('')
  const [coverLoading, setCoverLoading] = useState(false)
  const [preview, setPreview] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const titleRef = useRef(null)
  const authorRef = useRef(null)
  const coverRef = useRef(null)

  const book = useSelector((state) => state.book.book)
  const error = useSelector((state) => state.book.error)

  console.log(url)

  const getBook = async () => {
    setLoading(true)
    try {
      const {data} = await axios.post('https://bookshelf-server-blush.vercel.app/api/book', {id})
      setLocalBook(data.book)
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

    if (title.length < 3) {
      setLoading(false)
      dispatch(setError({error: 'Название должно содержать хотя-бы 3 символа'}))
      titleRef.current.focus()
      return
    }

    if (author.length < 3) {
      setLoading(false)
      dispatch(setError({error: 'Имя автора должно содержать хотя-бы 3 символа'}))
      authorRef.current.focus()
      return
    }

    try {
      const res = await axios.put('https://bookshelf-server-blush.vercel.app/api/books', {
        book_id: id,
        title: title,
        author: author,
        cover: url.length ? url : cover,
        read_date: date,
        description: description,
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setIsUpdate(false)
    }
  }

  const deleteBook = async () => {
    setLoading(true)
    try {
      const res = await axios.delete('https://bookshelf-server-blush.vercel.app/api/books', {
        data: {id: id},
      })
      console.log(res)
      dispatch(close())
      navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      console.log('Click delete')
    }
  }

  const uploadPrviewHandler = async (e) => {
    const file = e.target.files[0]
    setFile(file)

    const form = new FormData()
    form.append('image', file)

    setCoverLoading(true)
    dispatch(setError({error: ''}))

    try {
      const {data} = await axios.post(updUrl, form)
      const url = data.data.url
      setUrl(url)
      setCover(url)
      const blob = URL.createObjectURL(file)
      setPreview(blob)
    } catch (error) {
      console.log(error)
      dispatch(setError({error: 'Произошла ошибка при загрузке обложки'}))
    }
    setCoverLoading(false)
  }

  const cancelHandler = () => {
    setIsUpdate(false)
    setTitle(book.title)
    setAuthor(book.author)
    setDate(book.read_date)
    setDescription(book.description)
    setCover(book.cover)
    dispatch(setError({error: ''}))
  }

  useEffect(() => {
    getBook()
    dispatch(setError({error: ''}))
  }, [])

  useEffect(() => {
    setTitle(localBook.title)
    setAuthor(localBook.author)
    setDate(localBook.read_date)
    setDescription(localBook.description)
    setCover(localBook.cover)
  }, [localBook])

  return (
    <>
      {localBook ? (
        <div className={styles.Book}>
          {loading ? (
            <div className={styles.Loader}>
              <h1>Загрузка...</h1>
              <BookLoader w={'50px'} h={'50px'} black={true} />
            </div>
          ) : (
            <>
              <div className={styles.Cover}>
                {localBook.cover ? (
                  <div>
                    {isUpdate ? (
                      <div>
                        {coverLoading ? (
                          <div className={styles.CoverLoading}>
                            <h3>Загрузка...</h3>
                            <BookLoader w={'30px'} h={'30px'} black={true} />
                          </div>
                        ) : (
                          <div className={styles.UpdateCover}>
                            <div>
                              {cover || preview ? (
                                <div>
                                  {preview ? (
                                    <img src={preview} alt="preview" />
                                  ) : (
                                    <img src={cover} alt="cover" />
                                  )}
                                </div>
                              ) : (
                                <div className={styles.Placeholder}>
                                  <h4>{title}</h4>
                                  <div></div>
                                  <span>{author}</span>
                                </div>
                              )}
                            </div>
                            <div className={styles.UpdateCoverButtons}>
                              <button
                                onClick={() => {
                                  setIsDataUpdated(true)
                                  coverRef.current.click()
                                }}
                              >
                                Загрузить
                              </button>
                              {cover || preview ? (
                                <button
                                  onClick={() => {
                                    setIsDataUpdated(true)
                                    setCover('')
                                    setPreview('')
                                  }}
                                >
                                  Удалить
                                </button>
                              ) : null}
                              <input
                                type="file"
                                hidden
                                ref={coverRef}
                                onChange={uploadPrviewHandler}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <img src={cover} alt="cover" />
                    )}
                  </div>
                ) : (
                  <div className={styles.Placeholder}>
                    <h4>{title}</h4>
                    <div></div>
                    <span>{author}</span>
                  </div>
                )}
              </div>
              <div className={styles.Info}>
                <div className={styles.Details}>
                  {isUpdate ? (
                    <div className={styles.updTitle}>
                      <h3>Редактировать книгу</h3>
                      <img src={feather} alt="feather" />
                    </div>
                  ) : (
                    ''
                  )}
                  {isUpdate ? (
                    <div className={styles.InputBox}>
                      <input
                        ref={titleRef}
                        placeholder="Название"
                        type="text"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value)
                          setIsDataUpdated(true)
                        }}
                      />
                      <img src={iTitle} alt="title" />
                    </div>
                  ) : (
                    <h1>{title}</h1>
                  )}
                  {isUpdate ? (
                    <div className={styles.InputBox}>
                      <input
                        ref={authorRef}
                        placeholder="Автор"
                        type="text"
                        value={author}
                        onChange={(e) => {
                          setAuthor(e.target.value)
                          setIsDataUpdated(true)
                        }}
                      />
                      <img src={iAauthor} alt="author" />
                    </div>
                  ) : (
                    <h3>{author}</h3>
                  )}
                  {isUpdate ? (
                    <div className={styles.InputBox}>
                      <input
                        placeholder="Дата"
                        type="text"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value)
                          setIsDataUpdated(true)
                        }}
                      />
                      <img src={iDate} alt="date" />
                    </div>
                  ) : (
                    <span>Прочитана: {date}</span>
                  )}
                  {isUpdate ? (
                    <div className={styles.InputBox}>
                      <textarea
                        placeholder="Описание"
                        type="text"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value)
                          setIsDataUpdated(true)
                        }}
                      />
                      <img src={iAbout} alt="about" />
                    </div>
                  ) : (
                    <>
                      <span>Описание:</span>
                      <p>{description}</p>
                      <img src={pattern} alt="pattern" />
                    </>
                  )}
                </div>
                {error && <span className={styles.Error}>{error}</span>}
                <div className={styles.Buttons}>
                  {isUpdate ? (
                    <>
                      <button disabled={!isDataUpdated} onClick={updateBook}>
                        Подтвердить
                      </button>
                      <button className={styles.Del} onClick={cancelHandler}>
                        Отмена
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsUpdate((prev) => !prev)}>Изменить</button>
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
        </div>
      ) : (
        <h1>Произошла ошибка!</h1>
      )}
    </>
  )
}

export default BookPage
