import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/slice'
import booksReducer from './books/slice'
import modalReducer from './modal/slice'
import newBookReducer from './new_book/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    modal: modalReducer,
    newBook: newBookReducer,
  },
})
