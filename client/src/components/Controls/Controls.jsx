import React, {useEffect, useRef, useState} from 'react'
import styles from './Controls.module.scss'
import arrowDown from '../../assets/arrow-down.svg'
import SortItem from '../SortItem/SortItem'
import {useDispatch, useSelector} from 'react-redux'
import {open} from '../../redux/modal/slice'
import {useClickOutside} from '../../hooks/useClickOutside'

const Controls = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sort = ['Умолчанию', 'Дате', 'Алфавиту']
  const sortRef = useRef(null)

  useClickOutside(sortRef, () => {
    setIsOpen(false)
  })
  const isModalOpen = useSelector((state) => state.modal.isOpen)
  const dispatch = useDispatch()

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
      <div className={styles.Sort} onClick={() => setIsOpen(!isOpen)} ref={sortRef}>
        <span>Сортировать по</span>
        <img className={isOpen ? styles.Open : ''} src={arrowDown} alt="arrow-down" />
        {isOpen && (
          <ul className={styles.SortList}>
            {sort.map((item) => (
              <SortItem title={item} key={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Controls
