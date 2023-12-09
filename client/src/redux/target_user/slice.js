import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  user: {},
  books: [],
  isSubscribed: false,
  booksCount: 0,
  error: '',
}

const targetUserSlice = createSlice({
  name: 'targetUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload
    },
    setUserBooks: (state, action) => {
      state.books = action.payload.books
    },
    setBooksCount: (state, action) => {
      state.booksCount = action.payload.booksCount
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
  },
})

export const {setUser, setIsSubscribed, setUserBooks, setBooksCount, setLoading, setError} =
  targetUserSlice.actions
export default targetUserSlice.reducer
