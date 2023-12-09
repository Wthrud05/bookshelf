import React, {useEffect, useState} from 'react'
import styles from './Subscribers.module.scss'
import subs from '../../../assets/subscribers.svg'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setError, setLoading, setSubscribers} from '../../../redux/user/slice'
import {open} from '../../../redux/modal/slice'

const Subscribers = ({fn}) => {
  const dispatch = useDispatch()

  const user_id = useSelector((state) => state.auth.id)
  const loading = useSelector((state) => state.user.loading)
  const subscribers = useSelector((state) => state.user.subscribers)

  const getSubscribers = async () => {
    // dispatch(setLoading({loading: true}))
    try {
      const {data} = await axios.post('https://bookshelf-server-blush.vercel.app/api/subscribers', {
        id: user_id,
      })
      dispatch(setSubscribers({subscribers: data.subs}))
    } catch (error) {
      console.log(error)
      dispatch(setError({error: 'Произошла ошибка при загрузке подписок'}))
    } finally {
      dispatch(setLoading({loading: false}))
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
      <span>{subscribers.length}</span>
    </div>
  )
}

export default Subscribers
