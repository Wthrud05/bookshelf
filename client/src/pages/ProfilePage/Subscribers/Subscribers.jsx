import React, {useEffect} from 'react'
import styles from './Subscribers.module.scss'
import subs from '../../../assets/subscribers.svg'
import {useDispatch, useSelector} from 'react-redux'
import {getSubscirbersThunk} from '../../../redux/user/slice'
import {open} from '../../../redux/modal/slice'
import BookLoader from '../../../components/BookLoader/BookLoader'
import {useAuth} from '../../../hooks/useAuth'

const Subscribers = ({fn}) => {
  const dispatch = useDispatch()

  const {user} = useAuth()
  const loading = useSelector((state) => state.user.loading)
  const subscribers = useSelector((state) => state.user.subscribers)

  const getSubscribers = async () => {
    try {
      dispatch(getSubscirbersThunk({id: user.id}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSubscribers()
  }, [])

  return (
    <div className={styles.Subscribers}>
      <div
        className={styles.Header}
        onClick={() => {
          fn('Подписчики')
          dispatch(open())
        }}
      >
        <h3>Мои подписчики</h3>
        <img src={subs} alt="subs" />
      </div>
      {loading ? (
        <div className={styles.Loader}>
          <BookLoader w={'15px'} h={'15px'} black={true} />
        </div>
      ) : (
        <span>{subscribers.length}</span>
      )}
    </div>
  )
}

export default Subscribers
