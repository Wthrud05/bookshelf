import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  book: {},
  error: '',
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload.book
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
  },
})

export default bookSlice.reducer
export const {setBook, setError} = bookSlice.actions
