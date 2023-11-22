import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setLoading, removeUser} from '../../redux/auth/slice'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import styles from './ProfilePage.module.scss'
import BookLoader from '../../components/BookLoader/BookLoader'
import Avatar from '../../components/Avatar/Avatar'
import pattern from '../../assets/pattern.jpg'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const userName = useSelector((state) => state.auth.name)
  const userId = useSelector((state) => state.auth.id)
  const loading = useSelector((state) => state.auth.loading)
  const booksCount = useSelector((state) => state.books.booksCount)

  const logout = async (id) => {
    try {
      dispatch(setLoading({loading: true}))

      const res = await axios.post(
        'https://bookshelf-server-cb5y8i595-wthrud05.vercel.app/api/logout',
        {user_id: id},
      )
      const msg = await res.data.message
      localStorage.removeItem('user')
      dispatch(setLoading({loading: false}))
      dispatch(removeUser())
      navigator('/login')
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  return (
    <div className={styles.ProfilePage}>
      <Avatar />
      <h1 className={styles.Username}>{userName}</h1>
      <span>
        Книг: <b>{booksCount}</b>
      </span>
      <button className={styles.Logout} onClick={() => logout(userId)}>
        {loading ? <BookLoader w={'18px'} h={'18px'} /> : 'Выйти'}
      </button>
      <img className={styles.Pattern} src={pattern} alt="pattern" />
    </div>
  )
}

export default ProfilePage
