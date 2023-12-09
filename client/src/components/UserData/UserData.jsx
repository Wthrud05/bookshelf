import React, {useEffect, useState} from 'react'
import Avatar from '../Avatar/Avatar'
import styles from './UserData.module.scss'
import {useIsUser} from '../../hooks/useIsUser'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {setIsSubscribed, setLoading} from '../../redux/target_user/slice'

const UserData = ({count, name}) => {
  const dispatch = useDispatch()

  const {isSubscribed, loading} = useSelector((state) => state.targetUser)
  const userName = useSelector((state) => state.auth.name)
  const userId = useSelector((state) => state.auth.id)
  const {id} = useParams()

  const [isUser, setIsUser] = useState(false)
  const res = useIsUser()

  useEffect(() => {
    setIsUser(res)
  }, [res])

  const handleSubscribe = async () => {
    try {
      const {data} = await axios.post('http://localhost:5000/api/sub', {
        sub_id: id,
        user_id: userId,
        name: userName,
        sub_name: name,
      })
      console.log(data)
      dispatch(setIsSubscribed(true))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnsubscribe = async () => {
    try {
      const {data} = await axios.delete('http://localhost:5000/api/sub', {
        data: {id: id},
      })
      console.log(data)
      dispatch(setIsSubscribed(false))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={isUser ? styles.TargetUserData : styles.UserData}>
      <Avatar count={count} />
      <div>
        {loading ? <h1>Имя</h1> : <h1 className={styles.Username}>{name}</h1>}
        <span>
          Книг: <b>{count}</b>
        </span>
        {isUser && (
          <>
            {isSubscribed && (
              <button disabled={loading} onClick={() => handleUnsubscribe()}>
                Отписаться
              </button>
            )}
            {!isSubscribed && (
              <button disabled={loading} onClick={() => handleSubscribe()}>
                Подписаться
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default UserData
