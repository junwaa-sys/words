import { createSlice } from '@reduxjs/toolkit'

const initialState = { test: [] }

export const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    fetchData: (state, action) => {
      state.test.push(action.payload)
    },
  },
})

export const selectTestData = (state) => state.test.test
export const { fetchData } = testSlice.actions
export default testSlice.reducer
