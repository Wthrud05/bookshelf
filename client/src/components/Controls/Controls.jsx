import React, {useEffect, useRef, useState} from 'react'
import styles from './Controls.module.scss'
import arrowDown from '../../assets/arrow-down.svg'
import SortItem from '../SortItem/SortItem'
import {useDispatch, useSelector} from 'react-redux'
import {open} from '../../redux/modal/slice'
import {useClickOutside} from '../../hooks/useClickOutside'
import {sortTypes} from '../../utils/data'
import BookSearch from '../BookSearch/BookSearch'
import {AnimatePresence, motion} from 'framer-motion'

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
      <motion.div className={styles.Sort} onClick={() => setIsOpen(!isOpen)} ref={sortRef} layout>
        <span>{sortType}</span>
        <img className={isOpen ? styles.Open : ''} src={arrowDown} alt="arrow-down" />
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.ul
              initial={{opacity: 0, top: '20px'}}
              animate={{opacity: 1, top: '50px'}}
              exit={{opacity: 0, top: '20px'}}
              className={styles.SortList}
            >
              {sortTypes.map((item) => (
                <SortItem category={item} key={item} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Controls
