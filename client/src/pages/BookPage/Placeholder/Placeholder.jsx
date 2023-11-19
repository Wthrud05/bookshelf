import React, {useRef, useState} from 'react'
import styles from './Placeholder.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setCover, setError, setIsTouched, setLoading} from '../../../redux/book/slice'
import axios from 'axios'
import BookLoader from '../../../components/BookLoader/BookLoader'

const Placeholder = () => {
  const updUrl = import.meta.env.VITE_UPLOAD_IMG_URL
  const {title, author} = useSelector((state) => state.book.book)
  const {isUpdate, loading, isTouched} = useSelector((state) => state.book)

  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const uploadPrview = async (e) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('image', file)

    dispatch(setLoading({loading: true}))
    try {
      const {data} = await axios.post(updUrl, formData)
      dispatch(setCover(data.data.url))
    } catch (error) {
      dispatch(setError({error: 'Произошла ошибка при загрузке обложки'}))
    } finally {
      dispatch(setLoading({loading: false}))
    }
  }

  return (
    <div className={styles.Placeholder}>
      {loading ? (
        <BookLoader w={'30px'} h={'30px'} black={true} />
      ) : (
        <>
          <h3>{title}</h3>
          <div className={styles.Border}></div>
          <span>{author}</span>
          {isUpdate && (
            <div className={styles.PlaceholderButtons}>
              <button
                onClick={() => {
                  dispatch(setIsTouched({isTouched: true}))
                  inputRef.current.click()
                  inputRef.current.value = ''
                }}
              >
                Загрузить
              </button>
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg"
                ref={inputRef}
                onChange={(e) => {
                  uploadPrview(e)
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Placeholder
