import React, {useCallback, useEffect, useRef, useState} from 'react'
import styles from './UserSearch.module.scss'
import Search from '../../assets/search-user-grey.svg?react'
import axios from 'axios'
import UserList from '../UserList/UserList'
import cross from '../../assets/cross-black.svg'
import {useDispatch, useSelector} from 'react-redux'
import {setLoading, setSearchStr, setUsers} from '../../redux/users/slice'
import {filterUsersByParam} from '../../utils/helpers'
import {debounce} from 'lodash'

const UserSearch = () => {
  const dispatch = useDispatch()
  const {users, searchStr, loading} = useSelector((state) => state.users)
  const {isOpen} = useSelector((state) => state.modal)

  const inputRef = useRef(null)
  const [value, setValue] = useState('')

  const getUsers = async () => {
    dispatch(setLoading({loading: true}))
    try {
      const {data} = await axios('https://bookshelf-server-cb5y8i595-wthrud05.vercel.app/api/users')
      const filteredUsers = filterUsersByParam(data.users, searchStr)
      dispatch(setUsers({users: filteredUsers}))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading({loading: false}))
      inputRef.current.focus()
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

  useEffect(() => {
    inputRef.current.focus()
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
