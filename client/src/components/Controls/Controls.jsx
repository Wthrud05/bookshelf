import React, {useEffect, useRef, useState} from 'react'
import styles from './Controls.module.scss'
import arrowDown from '../../assets/arrow-down.svg'
import SortItem from '../SortItem/SortItem'

const Controls = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sort = ['Умолчанию', 'Дате', 'Алфавиту']
  const sortRef = useRef(null)
  const spanRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (
        e.target !== sortRef.current &&
        e.target !== spanRef.current &&
        e.target !== imgRef.current
      )
        setIsOpen(false)
    }

    document.body.addEventListener('click', outsideClickHandler)

    return () => {
      document.body.removeEventListener('click', outsideClickHandler)
    }
  }, [])

  return (
    <div className={styles.Controls}>
      <button>
        <span>Добавить</span>
        <span className={styles.Cross}>+</span>
      </button>
      <div className={styles.Sort} onClick={() => setIsOpen(!isOpen)} ref={sortRef}>
        <span ref={spanRef}>Сортировать по</span>
        <img ref={imgRef} className={isOpen ? styles.Open : ''} src={arrowDown} alt="arrow-down" />
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
