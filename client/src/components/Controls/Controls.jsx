import React, {useEffect, useRef, useState} from 'react'
import styles from './Controls.module.scss'
import arrowDown from '../../assets/arrow-down.svg'
import SortItem from '../SortItem/SortItem'
import {useDispatch, useSelector} from 'react-redux'
import {open} from '../../redux/modal/slice'
import {useClickOutside} from '../../hooks/useClickOutside'
import {sortTypes} from '../../utils/data'
import BookSearch from '../BookSearch/BookSearch'

const Controls = () => {
  const dispatch = useDispatch()
  const {sortType} = useSelector((state) => state.books)

  const [isOpen, setIsOpen] = useState(false)
  const sortRef = useRef(null)

  useClickOutside(sortRef, () => {
    setIsOpen(false)
  })
  return (
    <div className={styles.Controls}>
      <button
        onClick={() => {
          dispatch(open())
        }}
      >
        <span>Добавить</span>
        <span className={styles.Cross}>+</span>
      </button>
      <BookSearch />
      <div className={styles.Sort} onClick={() => setIsOpen(!isOpen)} ref={sortRef}>
        <span>{sortType}</span>
        <img className={isOpen ? styles.Open : ''} src={arrowDown} alt="arrow-down" />
        {isOpen && (
          <ul className={styles.SortList}>
            {sortTypes.map((item) => (
              <SortItem category={item} key={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Controls
