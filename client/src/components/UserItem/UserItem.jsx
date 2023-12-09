import React from 'react'
import styles from './UserItem.module.scss'
import reader from '../../assets/reader.svg'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {close} from '../../redux/modal/slice'

const UserItem = ({user, name}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(close())
    setTimeout(() => {
      navigate(`/user/${user.sub_id}`)
      {
        name === 'Подписки' && navigate(`/user/${user.sub_id}`)
      }
      {
        name === 'Подписчики' && navigate(`/user/${user.user_id}`)
      }
      {
        name === 'Пользователи' && navigate(`/user/${user.user_id}`)
      }
    }, 0)
  }

  return (
    <div className={styles.UserItem} onClick={clickHandler}>
      <div className={styles.UserAvatar}>
        <img src={reader} alt="user" />
      </div>
      {name === 'Подписки' && <h4>{user.sub_name}</h4>}
      {name === 'Подписчики' && <h4>{user.name}</h4>}
      {name === 'Пользователи' && <h4>{user.name}</h4>}
    </div>
  )
}

export default UserItem
