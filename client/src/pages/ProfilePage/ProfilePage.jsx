import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setLoading, removeUser} from '../../redux/auth/slice'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import styles from './ProfilePage.module.scss'
import {open} from '../../redux/modal/slice'
import BookLoader from '../../components/BookLoader/BookLoader'
import Avatar from '../../components/Avatar/Avatar'
import pattern from '../../assets/pattern.jpg'
import Subscriptions from './Subscriptions/Subscriptions'
import Subscribers from './Subscribers/Subscribers'
import Modal from '../../components/Modal/Modal'
import UserList from '../../components/UserList/UserList'
import UserSearch from '../../components/UserSearch/UserSearch'
import search from '../../assets/search-user.svg'
import UserData from '../../components/UserData/UserData'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const userName = useSelector((state) => state.auth.name)
  const loading = useSelector((state) => state.user.loading) // Когда идет загрузка подписок показывать лоадер всей страницы
  const authLoading = useSelector((state) => state.auth.loading)

  const {booksCount} = useSelector((state) => state.books)

  const userId = useSelector((state) => state.auth.id)

  const subscribers = useSelector((state) => state.user.subscribers)
  const subscriptions = useSelector((state) => state.user.subscriptions)

  const [type, setType] = useState('')

  const logout = async (id) => {
    try {
      dispatch(setLoading({loading: true}))

      const res = await axios.post('https://bookshelf-server-blush.vercel.app/api/logout', {
        user_id: id,
      })
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

  const getNameHandler = (name) => {
    setType(name)
  }

  return (
    <>
      <div className={styles.ProfilePage}>
        <UserData count={booksCount} name={userName} />
        <div className={styles.Socials}>
          <Subscriptions fn={getNameHandler} />
          <Subscribers fn={getNameHandler} />
        </div>
        <img className={styles.Pattern} src={pattern} alt="pattern" />
        <div className={styles.Actions}>
          <button
            className={styles.SearchUser}
            onClick={() => {
              setType('Поиск')
              dispatch(open())
            }}
          >
            <img src={search} alt="search" />
          </button>
          <button className={styles.Logout} onClick={() => logout(userId)}>
            {authLoading ? <BookLoader w={'18px'} h={'18px'} /> : 'Выйти'}
          </button>
        </div>
      </div>

      <Modal>
        {type === 'Подписки' && (
          <>
            <UserList users={subscriptions} name={type} />
          </>
        )}
        {type === 'Подписчики' && (
          <>
            <UserList users={subscribers} name={type} />
          </>
        )}
        {type === 'Поиск' && (
          <>
            <UserSearch />
          </>
        )}
      </Modal>
    </>
  )
}

export default ProfilePage
