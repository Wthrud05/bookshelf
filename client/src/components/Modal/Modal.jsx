import React, {useEffect, useRef} from 'react'
import styles from './Modal.module.scss'
import cross from '../../assets/cross-black.svg'
import {useDispatch, useSelector} from 'react-redux'
import {close} from '../../redux/modal/slice'
import {useClickOutside} from '../../hooks/useClickOutside'

const Modal = ({children}) => {
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  const isOpen = useSelector((state) => state.modal.isOpen)

  useClickOutside(modalRef, () => {
    dispatch(close()) // Вызывается при клике на любой элемент в HomePage
  })

  useEffect(() => {
    isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  }, [isOpen])

  return (
    <div className={isOpen ? styles.Modal + ' ' + styles.Open : styles.Modal}>
      <div
        className={isOpen ? styles.Content + ' ' + styles.OpenContent : styles.Content}
        ref={modalRef}
      >
        <img className={styles.Cross} src={cross} alt="cross" onClick={() => dispatch(close())} />
        {children}
      </div>
    </div>
  )
}

export default Modal
