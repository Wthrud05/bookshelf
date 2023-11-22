import React, {useRef} from 'react'
import styles from './Cover.module.scss'
import BookLoader from '../../../components/BookLoader/BookLoader'
import {useDispatch, useSelector} from 'react-redux'
import {setCover, setLoading, setError, setIsTouched} from '../../../redux/book/slice'
import axios from 'axios'
import headphones from '../../../assets/headphones.svg'

const Cover = () => {
  const updUrl = import.meta.env.VITE_UPLOAD_IMG_URL
  const inputRef = useRef(null)

  const {isUpdate, loading} = useSelector((state) => state.book)
  const {cover, isaudio} = useSelector((state) => state.book.book)

  const dispatch = useDispatch()

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
    <div className={styles.Cover}>
      {isaudio && <img className={styles.Audio} src={headphones} alt="audio" />}
      {loading ? (
        <BookLoader w={'30px'} h={'30px'} black={true} />
      ) : (
        <>
          <img src={cover} alt="cover" />
          {isUpdate && (
            <div className={styles.CoverButtons}>
              <button
                onClick={() => {
                  dispatch(setIsTouched({isTouched: true}))
                  inputRef.current.click()
                  inputRef.current.value = ''
                }}
              >
                Загрузить
              </button>
              <button onClick={() => dispatch(setCover(''))}>Удалить</button>
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

export default Cover
