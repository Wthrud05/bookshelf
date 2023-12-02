import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  subscriptions: [],
  subscribers: [],
  error: '',
}

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
})

export const {setSubscriptions, setSubscribers, setLoading, setError} = userSlice.actions
export default userSlice.reducer
