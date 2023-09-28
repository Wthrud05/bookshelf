import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  name: '',
  id: 0,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.id = action.payload.id
    },
    removeUser: (state) => {
      state.name = ''
      state.id = 0
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
  },
})

export default authSlice.reducer
export const {setUser, removeUser, setError, setLoading} = authSlice.actions
