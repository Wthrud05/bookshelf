import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  loading: false,
  subscriptions: [],
  subscribers: [],
  sortType: '',
  error: '',
}

export const getSubscirbersThunk = createAsyncThunk('user/getSubscribers', async ({id}) => {
  console.log('gg')
  const {data} = await axios.post(`${API_URL}/subscribers`, {id: id})
  console.log(data)
  return data.subs
})

export const getSubsciptionsThunk = createAsyncThunk('user/getSubsciptions', async ({id}) => {
  const {data} = await axios.post(`${API_URL}/subscriptions`, {id: id})
  return data.subs
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload.subscriptions
    },
    setSubscribers: (state, action) => {
      state.subscribers = action.payload.subscribers
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSubscirbersThunk.pending, (state, action) => {
      state.loading = true
      state.error = ''
    }),
      builder.addCase(getSubscirbersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.subscribers = action.payload
      }),
      builder.addCase(getSubscirbersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = 'Произошла ошибка'
      }),
      builder.addCase(getSubsciptionsThunk.pending, (state, action) => {
        state.loading = true
        state.error = ''
      }),
      builder.addCase(getSubsciptionsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.subscriptions = action.payload
      }),
      builder.addCase(getSubsciptionsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = 'Произошла ошибка'
      })
  },
})

export const {setSubscriptions, setSubscribers, setSortType, setLoading, setError} =
  userSlice.actions
export default userSlice.reducer
