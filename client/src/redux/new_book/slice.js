import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  newBook: {
    title: '',
    author: '',
    user_id: '',
    cover: '',
    read_date: '',
    is_audio: false,
    description: '',
  },
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
