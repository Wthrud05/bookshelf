import React, {useEffect} from 'react'
import styles from './UserPage.module.scss'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import UserData from '../../components/UserData/UserData'
import {
  setIsSubscribed,
  setLoading,
  getTargetUserThunk,
  getTargetUserBooksThunk,
} from '../../redux/target_user/slice'
import BookList from '../../components/BookList/BookList'
import BookLoader from '../../components/BookLoader/BookLoader'
import {motion} from 'framer-motion'

const UserPage = () => {
  const {id} = useParams()

  const dispatch = useDispatch()
  const {subscriptions} = useSelector((state) => state.user)
  const {user, books, booksCount, loading} = useSelector((state) => state.targetUser)

  const getUser = async () => {
    try {
      dispatch(getTargetUserThunk(id))
    } catch (error) {
      console.log(error)
    }
  }

  const getUserBooks = async () => {
    dispatch(setLoading({loading: true}))
    try {
      dispatch(getTargetUserBooksThunk(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    getUserBooks()
    dispatch(setIsSubscribed(subscriptions.some((sub) => sub.sub_id === +id)))
  }, [])

  return (
    <motion.div
      className={styles.UserPage}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.2}}
    >
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
    </motion.div>
  )
}

export default UserPage
