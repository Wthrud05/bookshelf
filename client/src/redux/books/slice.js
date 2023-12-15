import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {filterBooksByParam, sortByType} from '../../utils/helpers'

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

  const {data} = await axios.post('https://bookshelf-server-blush.vercel.app/api/books', {id: id})

  const sortedData = await sortByType(sortType, data.books, str, searchType)
  const count = data.books.length
  const currentCount = sortedData.length
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
