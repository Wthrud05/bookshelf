import React, {useEffect, useState} from 'react'
import Avatar from '../Avatar/Avatar'
import styles from './UserData.module.scss'
import {useIsUser} from '../../hooks/useIsUser'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {setIsSubscribed} from '../../redux/target_user/slice'
import pen from '../../assets/pen.svg'
import {setUser} from '../../redux/auth/slice'

const UserData = ({count, name}) => {
  const dispatch = useDispatch()

  const {isSubscribed, loading} = useSelector((state) => state.targetUser)
  const userName = useSelector((state) => state.auth.name)
  const userId = useSelector((state) => state.auth.id)
  const {id} = useParams()

  const [isUser, setIsUser] = useState(false)
  const res = useIsUser()

  const [nameValue, setNameValue] = useState(userName)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

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

  const changeNameHandler = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/change-name', {
        name: nameValue,
        id: userId,
      })
      dispatch(setUser({name: nameValue, id: userId}))
      localStorage.setItem('user', JSON.stringify({id: userId, name: nameValue}))
      setIsTouched(false)
      setIsUpdate(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={isUser ? styles.TargetUserData : styles.UserData}>
      <Avatar count={count} />
      <div className={styles.Data}>
        {loading ? (
          <div>
            <h1>Имя</h1>
          </div>
        ) : (
          <div>
            {isUser && <h1 className={styles.Username}>{name}</h1>}
            {!isUser && (
              <div>
                {isUpdate ? (
                  <div className={styles.ChangeName}>
                    <input
                      type="text"
                      value={nameValue}
                      onChange={(e) => {
                        setIsTouched(true)
                        setNameValue(e.target.value)
                      }}
                    />
                    <div>
                      <button disabled={!isTouched} onClick={changeNameHandler}>
                        Ок
                      </button>
                      <button
                        onClick={() => {
                          setNameValue(userName)
                          setIsTouched(false)
                          setIsUpdate(false)
                        }}
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button className={styles.ChangeBtn} onClick={() => setIsUpdate(true)}>
                      <img src={pen} alt="pen" />
                    </button>
                    <h1 className={styles.Username}>{name}</h1>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
