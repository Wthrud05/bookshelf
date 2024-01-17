import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  loading: false,
  newBook: {},
  error: '',
}

export const createBookThunk = createAsyncThunk('/newBook/create', async (book) => {
  const {data} = await axios.post(`${API_URL}/books-create`, book)

  return data.book
})

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
  extraReducers: (builder) => {
    builder.addCase(createBookThunk.pending, (state, action) => {
      state.loading = true
      state.error = ''
    }),
      builder.addCase(createBookThunk.fulfilled, (state, action) => {
        state.loading = false
        state.newBook = action.payload
      }),
      builder.addCase(createBookThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {setNewBook, setLoading, setError} = newBookSlice.actions
export default newBookSlice.reducer
