import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logoutThunk} from '../../redux/auth/slice'
import {Link, useNavigate} from 'react-router-dom'
import styles from './ProfilePage.module.scss'
import {open} from '../../redux/modal/slice'
import {motion} from 'framer-motion'
import BookLoader from '../../components/BookLoader/BookLoader'
import telegram from '../../assets/telegram.svg'
import pattern from '../../assets/pattern.jpg'
import Subscriptions from './Subscriptions/Subscriptions'
import Subscribers from './Subscribers/Subscribers'
import Modal from '../../components/Modal/Modal'
import UserList from '../../components/UserList/UserList'
import UserSearch from '../../components/UserSearch/UserSearch'
import search from '../../assets/search-user.svg'
import UserData from '../../components/UserData/UserData'
import {changeTextByCount} from '../../utils/helpers'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const userName = useSelector((state) => state.auth.name)
  const authLoading = useSelector((state) => state.auth.loading)

  const {booksCount} = useSelector((state) => state.books)
  const localBooksCount = JSON.parse(localStorage.getItem('booksCount'))

  const userId = useSelector((state) => state.auth.id)

  const subscribers = useSelector((state) => state.user.subscribers)
  const subscriptions = useSelector((state) => state.user.subscriptions)

  const [type, setType] = useState('')

  const logout = async (id) => {
    try {
      dispatch(logoutThunk({id, navigator}))
    } catch (error) {
      console.log(error.message)
    }
  }

  const getNameHandler = (name) => {
    setType(name)
  }

  return (
    <>
      <motion.div
        className={styles.ProfilePage}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.2}}
      >
        <div className={styles.Actions}>
          <button className={styles.Share} title="Поделиться">
            <Link
              target="_blank"
              to={`https://t.me/share/url?url=https://bookshelf-swart.vercel.app/user/${userId}&text=У меня в коллекции ${localBooksCount} ${changeTextByCount(
                localBooksCount,
              )} в Bookshelf! Присоединяйся, мой ник ${userName}`}
            >
              <img src={telegram} alt="telegram" />
            </Link>
          </button>
          <button
            title="Найти пользователя"
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
        <UserData count={localBooksCount} name={userName} />
        <div className={styles.Socials}>
          <Subscriptions fn={getNameHandler} />
          <Subscribers fn={getNameHandler} />
        </div>
        <img className={styles.Pattern} src={pattern} alt="pattern" />
      </motion.div>

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
