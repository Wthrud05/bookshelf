import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
  },
})

export default modalSlice.reducer
export const {open, close} = modalSlice.actions
