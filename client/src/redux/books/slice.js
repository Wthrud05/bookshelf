import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {sortByType} from '../../utils/helpers'

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  status: '',
  books: [],
  error: '',
  booksCount: 0,
  currentBooksCount: 0,
  sortType: '',
  searchType: 'Название',
  searchStr: '',
}

export const getBooksThunk = createAsyncThunk('books/getBooks', async (params) => {
  const {id, sortType, str, searchType} = params

  const {data} = await axios.post(`${API_URL}/books`, {id: id})

  const sortedData = await sortByType(sortType, data.books, str, searchType)
  const count = data.books.length
  const currentCount = sortedData.length
  localStorage.setItem('booksCount', JSON.stringify(data.books.length))
  return {sortedData, count, currentCount}
})

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload.books
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    setBooksCount: (state, action) => {
      state.booksCount = action.payload.booksCount
    },
    setCurrentBooksCount: (state, action) => {
      state.currentBooksCount = action.payload.currentBooksCount
    },
    setSortType: (state, action) => {
      state.sortType = action.payload.sortType
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload.searchType
    },
    setSearchStr: (state, action) => {
      state.searchStr = action.payload.str
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksThunk.pending, (state) => {
      state.books = []
      state.booksCount = 0
      state.currentBooksCount = 0
      state.status = 'loading'
    }),
      builder.addCase(getBooksThunk.fulfilled, (state, action) => {
        state.books = action.payload.sortedData
        state.booksCount = action.payload.count
        state.currentBooksCount = action.payload.currentCount
        state.status = 'Success'
      }),
      builder.addCase(getBooksThunk.rejected, (state, action) => {
        state.books = []
        state.booksCount = 0
        state.currentBooksCount = 0
        state.status = 'Error'
        state.error = 'Произошла ошибка при загузке книг'
      })
  },
})

export default booksSlice.reducer
export const {
  setBooks,
  setLoading,
  setBooksCount,
  setCurrentBooksCount,
  setSearchStr,
  setSortType,
  setSearchType,
} = booksSlice.actions
