import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../Apis/testHistory'

const initialState = {
  history: [],
  isLoadingHistory: false,
  failedToLoadHistories: false,
}

export const loadHistory = createAsyncThunk(
  'history/fetchHistory',
  async (token) => {
    const response = await api.getTestHistory(token)
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
  },
})

export const selectHistories = (state) => state.history.history
export const isLoadingHistory = (state) => state.testHistory.isLoadingHistory
export const slice = historySlice.reducer

export default historySlice.reducer
