import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../Apis/bingo'

const initialState = {
  games: [],
  isLoadingGames: false,
  faileToLoadGames: false,
}

export const loadGames = createAsyncThunk('bingo/fetchGames', async (token) => {
  const response = await api.getLiveGames(token)
  return response
})

const bingoSlice = createSlice({
  name: 'bingo',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(loadGames.pending, (state, action) => {
      state.isLoadingGames = true
    })
    builder.addCase(loadGames.fulfilled, (state, action) => {
      state.isLoadingGames = false
      state.games = [...action.payload]
    })
    builder.addCase(loadGames.rejected, (state, action) => {
      state.isLoadingGames = false
      state.faileToLoadGames = true
    })
  },
})

export default bingoSlice.reducer
export const isLoadingGames = (state) => state.isLoadingGames
export const selectGames = (state) => state.bingo.games
