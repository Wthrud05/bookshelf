import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {filterUsersByParam} from '../../utils/helpers'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  loading: false,
  users: [],
  searchStr: '',
  error: '',
}

export const getUsersThunk = createAsyncThunk('users/getUsers', async ({searchStr}) => {
  const {data} = await axios(`${API_URL}/users`)
  const filteredUsers = filterUsersByParam(data.users, searchStr)
  return filteredUsers
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
    setSearchStr: (state, action) => {
      state.searchStr = action.payload.str
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state, action) => {
      state.error = ''
      state.loading = true
    }),
      builder.addCase(getUsersThunk.fulfilled, (state, action) => {
        state.error = ''
        state.loading = false
        state.users = action.payload
      }),
      builder.addCase(getUsersThunk.rejected, (state, action) => {
        state.error = 'Произошла ошибка'
        state.loading = false
      })
  },
})

export const {setUsers, setLoading, setError, setSearchStr} = usersSlice.actions
export default usersSlice.reducer
