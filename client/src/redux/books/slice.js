import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  books: [],
  error: '',
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload
    },
  },
})

export default booksSlice.reducer
export const {setBooks} = booksSlice.actions
