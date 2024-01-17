import React, {useEffect, useState} from 'react'
import styles from './Subscriptions.module.scss'
import subscribtions from '../../../assets/subscriptions.svg'
import {useDispatch, useSelector} from 'react-redux'
import {getSubsciptionsThunk, setLoading} from '../../../redux/user/slice'
import {open} from '../../../redux/modal/slice'
import {useAuth} from '../../../hooks/useAuth'
import BookLoader from '../../../components/BookLoader/BookLoader'

const Subscriptions = ({fn}) => {
  const dispatch = useDispatch()

  const {user} = useAuth()
  const loading = useSelector((state) => state.user.loading)
  const subscriptions = useSelector((state) => state.user.subscriptions)

  const getSubscriptions = async () => {
    dispatch(setLoading({loading: true}))
    try {
      dispatch(getSubsciptionsThunk({id: user.id}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSubscriptions()
  }, [])

  return (
    <div className={styles.Subscriptions}>
      <div
        className={styles.Header}
        onClick={() => {
          dispatch(open())
          fn('Подписки')
        }}
      >
        <h3>Мои подписки</h3>
        <img src={subscribtions} alt="subs" />
      </div>
      {loading ? (
        <div className={styles.Loader}>
          <BookLoader w={'15px'} h={'15px'} black={true} />
        </div>
      ) : (
        <span>{subscriptions.length}</span>
      )}
    </div>
  )
}

export default Subscriptions
