import React, {useEffect, useState} from 'react'
import styles from './UserPage.module.scss'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import UserData from '../../components/UserData/UserData'
import {
  setUser,
  setBooksCount,
  setIsSubscribed,
  setUserBooks,
  setLoading,
} from '../../redux/target_user/slice'
import BookList from '../../components/BookList/BookList'
import BookLoader from '../../components/BookLoader/BookLoader'

const UserPage = () => {
  const {id} = useParams()

  const dispatch = useDispatch()
  const {subscriptions} = useSelector((state) => state.user)
  const {user, isSubscribed, books, booksCount, loading} = useSelector((state) => state.targetUser)

  const getUser = async () => {
    dispatch(setUser({user: {}}))
    try {
      const {data} = await axios.post('https://bookshelf-server-blush.vercel.app/api/user', {id})
      setUser(data.user)
      dispatch(setUser({user: data.user}))
    } catch (error) {
      console.log(error)
    }
  }

  const getUserBooks = async () => {
    dispatch(setLoading({loading: true}))
    try {
      const {data} = await axios.post('https://bookshelf-server-blush.vercel.app/api/books', {id})
      dispatch(setBooksCount({booksCount: data.books.length}))
      dispatch(setUserBooks({books: data.books}))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading({loading: false}))
    }
  }

  useEffect(() => {
    getUser()
    getUserBooks()
    dispatch(setIsSubscribed(subscriptions.some((sub) => sub.sub_id === +id)))
  }, [])

  return (
    <div className={styles.UserPage}>
      <>
        <UserData count={booksCount} name={user.name} />
        {loading ? (
          <div className={styles.Loader}>
            <h1>Загрузка…</h1>
            <BookLoader w={'50px'} h={'50px'} black={true} />
          </div>
        ) : (
          <BookList books={books} />
        )}
      </>
    </div>
  )
}

export default UserPage
