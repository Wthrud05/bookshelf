import React from 'react'
import styles from './UserList.module.scss'
import UserItem from '../UserItem/UserItem'
import {useSelector} from 'react-redux'
import BookLoader from '../BookLoader/BookLoader'

const UserList = ({users, name}) => {
  const {loading} = useSelector((state) => state.users)

  return (
    <div className={styles.UserList}>
      {name === 'Пользователи' ? '' : <h3>{name}</h3>}
      {loading ? (
        <div className={styles.Loader}>
          <h3>Загрузка...</h3>
          <BookLoader w={'30px'} h={'30px'} black={true} />
        </div>
      ) : (
        <ul>
          {users.length < 1 ? (
            <div className={styles.Loader}>
              <h3>Пользователи не найдены</h3>
            </div>
          ) : (
            <>
              {users.map((user, i) => (
                <UserItem key={i} user={user} name={name} />
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  )
}

export default UserList
