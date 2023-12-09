import React, {useEffect, useState} from 'react'
import styles from './Subscriptions.module.scss'
import subscribtions from '../../../assets/subscriptions.svg'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setError, setLoading, setSubscriptions} from '../../../redux/user/slice'
import {open} from '../../../redux/modal/slice'

const Subscriptions = ({fn}) => {
  const dispatch = useDispatch()

  const user_id = useSelector((state) => state.auth.id)
  const loading = useSelector((state) => state.user.loading)
  const subscriptions = useSelector((state) => state.user.subscriptions)

  const [isOpen, setIsOpen] = useState(false)

  const getSubscriptions = async () => {
    // dispatch(setLoading({loading: true}))
    try {
      const {data} = await axios.post(
        'https://bookshelf-server-blush.vercel.app/api/subscriptions',
        {id: user_id},
      )
      dispatch(setSubscriptions({subscriptions: data.subs}))
    } catch (error) {
      console.log(error)
      dispatch(setError({error: 'Произошла ошибка при загрузке подписок'}))
    } finally {
      dispatch(setLoading({loading: false}))
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
      <span>{subscriptions.length}</span>
    </div>
  )
}

export default Subscriptions