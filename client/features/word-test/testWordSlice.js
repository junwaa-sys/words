import * as api from '../../Apis/wordTest'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  testWords: [],
  results: [],
  isLoadingTestWords: false,
  failedLoadingTestWords: false,
  isLoadingAddTestResult: false,
  failedAddingTestResult: false,
}

export const fetchTestWords = createAsyncThunk(
  'testWords/fetch-test-words',
  async (data, thunkAPI) => {
    const response = await api.fetchTestWords(data)
    return response
  }
)

export const addTestResult = createAsyncThunk(
  'testWords/add-test-result',
  async (data) => {
    const response = await api.addTestResult(data)
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
    builder.addCase(addTestResult.pending, (state, action) => {
      state.isLoadingAddTestResult = true
    })

    builder.addCase(addTestResult.fulfilled, (state, action) => {
      state.isLoadingAddTestResult = false
    })

    builder.addCase(addTestResult.rejected, (state, action) => {
      state.isLoadingAddTestResult = false
      state.failedAddingTestResult = true
    })
  },
})

export const selectTestWordsData = (state) => state.testWords
export const isLoadingTestWords = (state) => state.isLoadingTestWord
export const isLoadingAddTestResult = (state) => state.isLoadingAddTestResult

export default testWordsSlice.reducer
