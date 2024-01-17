import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  loading: false,
  isUpdate: false,
  isTouched: false,
  book: {
    book_id: null,
    title: '',
    author: '',
    user_id: null,
    cover: '',
    read_date: '',
    isAudio: false,
    description: '',
    imgData: {},
  },
  error: '',
}

export const getBookThunk = createAsyncThunk('book/getBook', async (id) => {
  const {data} = await axios.post(`${API_URL}/book`, {id}).catch((e) => {
    if (e.response) throw new Error(e.response.data.message)
  })
  return data.book
})

export const updateBookThunk = createAsyncThunk('book/updateBook', async (book) => {
  if (book.title.length < 3) {
    throw new Error('Название должно содержать хотя-бы 3 символа')
  }

  if (book.author.length < 3) throw new Error('Имя автора должно содержать хотя-бы 3 символа')

  const {data} = await axios
    .put(`${API_URL}/books`, {
      book_id: book.book_id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      read_date: book.read_date,
      description: book.description,
    })
    .catch((e) => {
      if (e.response) throw new Error(e.response.data.message)
    })
  return data.book
})

export const deleteBookThunk = createAsyncThunk('book/deleteBook', async ({id, navigator}) => {
  await axios
    .delete(`${API_URL}/books`, {
      data: {id: id},
    })
    .catch((e) => {
      if (e.response) throw new Error(e.response.data.message)
    })
  navigator('/')
})

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload.book
    },
    setTitle: (state, action) => {
      state.book.title = action.payload
    },
    setAuthor: (state, action) => {
      state.book.author = action.payload
    },
    setCover: (state, action) => {
      state.book.cover = action.payload
    },
    setReadDate: (state, action) => {
      state.book.read_date = action.payload
    },
    setDescription: (state, action) => {
      state.book.description = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload.isUpdate
    },
    setIsTouched: (state, action) => {
      state.isTouched = action.payload.isTouched
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookThunk.pending, (state, action) => {
      state.loading = true
      state.error = ''
    }),
      builder.addCase(getBookThunk.fulfilled, (state, action) => {
        state.loading = false
        state.book = action.payload
      }),
      builder.addCase(getBookThunk.rejected, (state, action) => {
        state.loading = false
        state.error = 'Произошла ошибка при загрузке книги'
      }),
      builder.addCase(updateBookThunk.pending, (state, action) => {
        state.loading = true
        state.error = ''
      }),
      builder.addCase(updateBookThunk.fulfilled, (state, action) => {
        state.loading = false
        state.book = action.payload
        state.isTouched = false
        state.isUpdate = false
      }),
      builder.addCase(updateBookThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      }),
      builder.addCase(deleteBookThunk.pending, (state, action) => {
        state.loading = true
      }),
      builder.addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.loading = false
      }),
      builder.addCase(deleteBookThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default bookSlice.reducer
export const {
  setBook,
  setTitle,
  setAuthor,
  setCover,
  setReadDate,
  setDescription,
  setError,
  setLoading,
  setIsUpdate,
  setIsTouched,
} = bookSlice.actions
