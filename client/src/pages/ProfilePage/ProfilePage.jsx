import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useAuth} from '../../hooks/useAuth'
import {setLoading, setUser, removeUser} from '../../redux/auth/slice'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import styles from './ProfilePage.module.scss'
import BookLoader from '../../components/BookLoader/BookLoader'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const userName = useSelector((state) => state.auth.name)
  const userId = useSelector((state) => state.auth.id)
  const loading = useSelector((state) => state.auth.loading)

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
      <h1>Здравствуйте {userName}!</h1>
      <button onClick={() => logout(userId)}>
        {loading ? <BookLoader w={'18px'} h={'18px'} /> : 'Выйти'}
      </button>
    </div>
  )
}

export default ProfilePage
