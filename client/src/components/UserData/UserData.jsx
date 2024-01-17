import React, {useEffect, useState} from 'react'
import Avatar from '../Avatar/Avatar'
import styles from './UserData.module.scss'
import {useIsUser} from '../../hooks/useIsUser'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {subscribeThunk, unSubscribeThunk} from '../../redux/target_user/slice'
import pen from '../../assets/pen.svg'
import {changeNameThunk} from '../../redux/auth/slice'
import BookLoader from '../BookLoader/BookLoader'
import {useGuest} from '../../hooks/useGuest'

const UserData = ({count, name}) => {
  const isGuest = useGuest()
  const {id} = useParams()
  const res = useIsUser()

  const dispatch = useDispatch()
  const {isSubscribed, loading, error} = useSelector((state) => state.targetUser)
  const userName = useSelector((state) => state.auth.name)
  const userId = useSelector((state) => state.auth.id)

  const [localLoading, setLoading] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [nameValue, setNameValue] = useState(userName)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    setIsUser(res)
  }, [res])

  const handleUnsubscribe = async () => {
    setLoading(true)
    try {
      dispatch(unSubscribeThunk(id)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubscribe = () => {
    setLoading(true)
    try {
      dispatch(subscribeThunk({sub_id: id, user_id: userId, name: userName, sub_name: name})).then(
        () => {
          setLoading(false)
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  const changeNameHandler = async () => {
    try {
      dispatch(changeNameThunk({name: nameValue, id: userId}))
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
                      value={nameValue || userName}
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
                {error && <span>{error}</span>}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default UserData
