import {createSlice} from '@reduxjs/toolkit'

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
