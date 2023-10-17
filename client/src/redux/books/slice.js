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
      state.books = action.payload.books
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
  },
})

export default booksSlice.reducer
export const {setBooks, setLoading} = booksSlice.actions
