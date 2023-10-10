import * as api from '../../Apis/wordTest'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  testWords: [],
  isLoadingTestWords: false,
  failedLoadingTestWords: false,
}

export const fetchTestWords = createAsyncThunk(
  'testWords/fetch-test-words',
  async (data, thunkAPI) => {
    const response = await api.fetchTestWords(data)
    console.log(response)
    return response
  }
)

export const testWordsSlice = createSlice({
  name: 'testWords',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTestWords.pending, (state, action) => {
      state.isLoadingTestWords = true
    })

    builder.addCase(fetchTestWords.fulfilled, (state, action) => {
      state.isLoadingTestWords = false
      if (action.payload) {
        state.testWords = [...action.payload]
      }
    })

    builder.addCase(fetchTestWords.rejected, (state, action) => {
      state.isLoadingTestWords = false
      state.failedLoadingTestWords = true
    })
  },
})

export const selectTestWordsData = (state) => state.testWords
export const isLoadingTestWords = (state) => state.isLoadingTestWord
export default testWordsSlice.reducer
