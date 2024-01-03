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
import BookLoader from '../BookLoader/BookLoader'
import {useGuest} from '../../hooks/useGuest'

const UserData = ({count, name}) => {
  const dispatch = useDispatch()
  const [localLoading, setLoading] = useState(false)

  const isGuest = useGuest()

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
    setLoading(true)
    try {
      const {data} = await axios.post('https://bookshelf-server-blush.vercel.app/api/sub', {
        sub_id: id,
        user_id: userId,
        name: userName,
        sub_name: name,
      })
      dispatch(setIsSubscribed(true))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnsubscribe = async () => {
    setLoading(true)
    try {
      const {data} = await axios.delete('https://bookshelf-server-blush.vercel.app/api/sub', {
        data: {id: id},
      })
      console.log(data)
      dispatch(setIsSubscribed(false))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const changeNameHandler = async () => {
    try {
      const res = await axios.post('https://bookshelf-server-blush.vercel.app/api/change-name', {
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
          <div className={styles.Loader}>
            <BookLoader w={'30px'} h={'30px'} black={true} />
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
        <span className={styles.Count}>
          Книг: <b>{count}</b>
        </span>
        {isGuest ? null : (
          <>
            {isUser && (
              <>
                {isSubscribed && (
                  <button disabled={loading} onClick={() => handleUnsubscribe()}>
                    {localLoading ? <BookLoader w={'15px'} h={'15px'} /> : 'Отписаться'}
                  </button>
                )}
                {!isSubscribed && (
                  <button disabled={loading} onClick={() => handleSubscribe()}>
                    {localLoading ? <BookLoader w={'15px'} h={'15px'} /> : 'Подписаться'}
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default UserData
