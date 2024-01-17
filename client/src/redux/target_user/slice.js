import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  loading: false,
  user: {},
  books: [],
  isSubscribed: false,
  booksCount: 0,
  error: '',
}

export const getTargetUserThunk = createAsyncThunk('targetUser/getUser', async (id) => {
  const {data} = await axios.post(`${API_URL}/user`, {id})
  return data.user
})

export const getTargetUserBooksThunk = createAsyncThunk('targetUser/getUserBooks', async (id) => {
  const {data} = await axios.post(`${API_URL}/books`, {id})
  const sortedBooks = data.books.sort((a, b) => b.book_id - a.book_id)
  const booksCount = sortedBooks.length

  return {sortedBooks, booksCount}
})

export const subscribeThunk = createAsyncThunk('/targetUser/subscribe', async (params) => {
  const {sub_id, user_id, name, sub_name} = params

  await axios.post(`${API_URL}/sub`, {
    sub_id,
    user_id,
    name,
    sub_name,
  })
})

export const unSubscribeThunk = createAsyncThunk('/targetUser/unsubscribe', async (id) => {
  await axios.delete(`${API_URL}/sub`, {
    data: {id: id},
  })
})

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
  extraReducers: (builder) => {
    builder.addCase(subscribeThunk.pending, (state, action) => {
      state.error = ''
    }),
      builder.addCase(subscribeThunk.fulfilled, (state, action) => {
        state.isSubscribed = true
      }),
      builder.addCase(subscribeThunk.rejected, (state, action) => {
        state.error = 'Произошла ошибка'
      })
    builder.addCase(unSubscribeThunk.pending, (state, action) => {
      state.error = ''
    }),
      builder.addCase(unSubscribeThunk.fulfilled, (state, action) => {
        state.isSubscribed = false
      }),
      builder.addCase(unSubscribeThunk.rejected, (state, action) => {
        state.error = 'Произошла ошибка'
      }),
      builder.addCase(getTargetUserThunk.pending, (state, action) => {
        state.user = {}
        state.error = ''
        state.loading = true
      }),
      builder.addCase(getTargetUserThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      }),
      builder.addCase(getTargetUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = 'Произошла ошибка'
      }),
      builder.addCase(getTargetUserBooksThunk.pending, (state, action) => {
        state.books = []
        state.error = ''
        state.loading = true
      })
    builder.addCase(getTargetUserBooksThunk.fulfilled, (state, action) => {
      state.books = action.payload.sortedBooks
      state.booksCount = action.payload.booksCount
      state.loading = false
    }),
      builder.addCase(getTargetUserBooksThunk.rejected, (state, action) => {
        state.loading = false
        state.error = 'Произошла ошибка'
      })
  },
})

export const {setUser, setIsSubscribed, setUserBooks, setBooksCount, setLoading, setError} =
  targetUserSlice.actions
export default targetUserSlice.reducer
