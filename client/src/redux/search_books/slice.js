import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoading: false,
  books: [],
  searchStr: '',
  error: '',
}

export const getSearchedBooksThunk = createAsyncThunk('searchBooks/getBooks', async (query) => {
  const {data} = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyDnBNzhjYDn4dvQKNJ22JEVklSj8cGI8Vg&`,
  )
  const books = await data.items
  return {books}
})

const searchBooksSlice = createSlice({
  name: 'searchBooks',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload.books
    },
    setSearchStr: (state, action) => {
      state.searchStr = action.payload.str
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchedBooksThunk.pending, (state) => {
      state.books = []
      state.isLoading = true
    }),
      builder.addCase(getSearchedBooksThunk.fulfilled, (state, action) => {
        state.books = action.payload.books
        state.isLoading = false
      }),
      builder.addCase(getSearchedBooksThunk.rejected, (state, action) => {
        state.books = []
        state.error = 'Произошла ошибка при загузке книг'
        state.isLoading = false
      })
  },
})

export default searchBooksSlice.reducer
export const {setBooks, setSearchStr} = searchBooksSlice.actions
