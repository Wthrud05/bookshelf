import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  books: [],
  error: '',
  booksCount: 0,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload.books
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    setBooksCount: (state, action) => {
      state.booksCount = action.payload.booksCount
    },
  },
})

export default booksSlice.reducer
export const {setBooks, setLoading, setBooksCount} = booksSlice.actions
