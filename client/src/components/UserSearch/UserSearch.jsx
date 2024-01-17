import React, {useCallback, useEffect, useRef, useState} from 'react'
import styles from './UserSearch.module.scss'
import Search from '../../assets/search-user-grey.svg?react'
import UserList from '../UserList/UserList'
import cross from '../../assets/cross-black.svg'
import {useDispatch, useSelector} from 'react-redux'
import {getUsersThunk, setSearchStr} from '../../redux/users/slice'
import {debounce} from 'lodash'

const UserSearch = () => {
  const dispatch = useDispatch()
  const {users, searchStr, loading} = useSelector((state) => state.users)
  const {isOpen} = useSelector((state) => state.modal)

  const inputRef = useRef(null)
  const [value, setValue] = useState('')

  const getUsers = async () => {
    try {
      dispatch(getUsersThunk({searchStr}))
    } catch (error) {
      console.log(error)
    }
  }

  const updateInputHandler = (e) => {
    setValue(e.target.value)
    searchUserHandler(e.target.value)
  }

  const searchUserHandler = useCallback(
    debounce((str) => {
      dispatch(setSearchStr({str: str}))
    }, 500),
    [],
  )

  const clearInputHandler = () => {
    setValue('')
    dispatch(setSearchStr({str: ''}))
  }

  useEffect(() => {
    getUsers()
  }, [searchStr])

  useEffect(() => {
    setValue('')
    dispatch(setSearchStr({str: ''}))
  }, [isOpen])

  return (
    <div className={styles.UserSearch}>
      <h3>Поиск пользователей</h3>
      <div className={styles.InputBox}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => updateInputHandler(e)}
          type="text"
          placeholder="Введите имя пользователя"
        />
        <Search className={styles.Icon} />
        {value && (
          <button className={styles.Cross} onClick={clearInputHandler}>
            <img src={cross} alt="cross" />
          </button>
        )}
      </div>
      <UserList users={users} name={'Пользователи'} />
    </div>
  )
}

export default UserSearch
