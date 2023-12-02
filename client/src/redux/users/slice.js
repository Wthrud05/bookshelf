import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  users: [],
  searchStr: '',
  error: '',
}

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
})

export const {setUsers, setLoading, setError, setSearchStr} = usersSlice.actions
export default usersSlice.reducer
