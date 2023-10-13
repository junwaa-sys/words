import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../Apis/testHistory'

const initialState = {
  history: [],
  historyByWord: [],
  isLoadingHistory: false,
  failedToLoadHistories: false,
  isLoadingHistoryByWord: false,
  failedToLoadHistoryByWord: false,
}

export const loadHistory = createAsyncThunk(
  'history/fetchHistory',
  async (token) => {
    const response = await api.getTestHistory(token)
    return response
  }
)

export const loadRecordByWord = createAsyncThunk(
  'history/fetchHistory-by-word',
  async (token) => {
    const response = await api.getTestHistoryByWord(token)
    return response
  }
)

const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(loadHistory.pending, (state, action) => {
      state.isLoadingHistory = true
    })

    builder.addCase(loadHistory.fulfilled, (state, action) => {
      state.history = [...action.payload]
      state.isLoadingHistory = false
    })

    builder.addCase(loadHistory.rejected, (state, action) => {
      state.isLoadingHistory = false
      state.failedToLoadHistories = true
    })

    builder.addCase(loadRecordByWord.pending, (state, action) => {
      state.isLoadingHistoryByWord = true
    })

    builder.addCase(loadRecordByWord.fulfilled, (state, action) => {
      state.historyByWord = [...action.payload]
      state.isLoadingHistoryByWord = false
    })

    builder.addCase(loadRecordByWord.rejected, (state, action) => {
      state.isLoadingHistoryByWord = false
      state.failedToLoadHistoryByWord = true
    })
  },
})

export const isLoadingHistory = (state) => state.testHistory.isLoadingHistory
export const isLoadingHistoryByWord = (state) =>
  state.testHistory.isLoadingHistoryByWord
export const slice = historySlice.reducer

export default historySlice.reducer
