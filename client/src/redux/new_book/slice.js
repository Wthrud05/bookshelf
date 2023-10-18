import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  newBook: {},
  error: '',
}

const newBookSlice = createSlice({
  name: 'new_book',
  initialState,
  reducers: {
    setNewBook: (state, action) => {
      state.newBook = action.payload.book
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
  },
})

export const {setNewBook, setLoading, setError} = newBookSlice.actions
export default newBookSlice.reducer
