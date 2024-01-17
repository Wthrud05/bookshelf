import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  loading: false,
  name: '',
  id: 0,
  error: '',
}

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async ({userName, password, navigator, type}) => {
    if (userName.length < 2 || password.length < 6) {
      throw new Error('Имя должно содержать хотя-бы 2 символа, пароль 6 символов')
    }

    const res = await axios.post(`${API_URL}/${type}`, {name: userName, password}).catch((e) => {
      if (e.response) throw new Error(e.response.data.message)
    })
    const {id, name} = await res.data.user
    localStorage.setItem('user', JSON.stringify({id, name}))
    navigator('/')
    return {id, name}
  },
)

export const logoutThunk = createAsyncThunk('auth/logout', async ({id, navigator}) => {
  await axios
    .post(`${API_URL}/logout`, {
      user_id: id,
    })
    .catch((e) => {
      throw new Error('Произошла ошибка')
    })
  localStorage.removeItem('user')
  navigator('/login')
})

export const changeNameThunk = createAsyncThunk('auth/changeName', async ({name, id}) => {
  await axios
    .post(`${API_URL}/change-name`, {
      name: name,
      id: id,
    })
    .catch((e) => {
      throw new Error(e.response.data.message)
    })
  localStorage.setItem('user', JSON.stringify({id: id, name: name}))
  return {id, name}
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.id = action.payload.id
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.loading = true
      state.error = ''
    }),
      builder.addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.id = action.payload.id
        state.name = action.payload.name
      }),
      builder.addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      }),
      builder.addCase(logoutThunk.pending, (state, action) => {
        state.loading = true
        state.error = ''
      }),
      builder.addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false
        state.id = 0
        state.name = ''
      }),
      builder.addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder.addCase(changeNameThunk.pending, (state, action) => {
      state.error = ''
    }),
      builder.addCase(changeNameThunk.fulfilled, (state, action) => {
        state.id = action.payload.id
        state.name = action.payload.name
      }),
      builder.addCase(changeNameThunk.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default authSlice.reducer
export const {setUser, removeUser, setError, setLoading} = authSlice.actions
