import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  books: [],
  error: '',
  booksCount: 0,
  currentBooksCount: 0,
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
    setCurrentBooksCount: (state, action) => {
      state.currentBooksCount = action.payload.currentBooksCount
    },
  },
})

export default booksSlice.reducer
export const {setBooks, setLoading, setBooksCount, setCurrentBooksCount} = booksSlice.actions
