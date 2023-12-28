import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../Apis/bingo'

const initialState = {
  games: [],
  words: [],
  isLoadingWords: false,
  failedToLoadWords: false,
  isLoadingGames: false,
  failedToLoadGames: false,
  isLoadingAddGame: false,
  fialedToAddGame: false,
}

export const loadGames = createAsyncThunk('bingo/fetchGames', async (token) => {
  const response = await api.getLiveGames(token)
  return response
})

export const addGame = createAsyncThunk('bingo/addGame', async (data) => {
  const response = await api.addGame(data)
  return response
})

export const loadWords = createAsyncThunk('bing/fetchWords', async (token) => {
  const response = await api.getWords(token)
  return response
})

export const deleteGame = createAsyncThunk('bingo/deleteGame', async (data) => {
  const response = await api.deleteGame(data)
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
      state.failedToLoadGames = true
    })
    builder.addCase(addGame.pending, (state, action) => {
      state.isLoadingAddGame = true
    })
    builder.addCase(addGame.fulfilled, (state, action) => {
      state.isLoadingAddGame = false
    })
    builder.addCase(addGame.rejected, (state, action) => {
      state.isLoadingAddGame = false
      state.fialedToAddGame = true
    })

    builder.addCase(loadWords.pending, (state, action) => {
      state.isLoadingWords = true
    })
    builder.addCase(loadWords.fulfilled, (state, action) => {
      state.isLoadingWords = false
      state.words = [...action.payload]
    })
    builder.addCase(loadWords.rejected, (state, action) => {
      state.isLoadingWords = false
      state.failedToLoadWords = true
    })
  },
})

export default bingoSlice.reducer
export const isLoadingGames = (state) => state.isLoadingGames
export const isLoadingAddGame = (state) => state.isLoadingAddGame
export const isLoadingWords = (state) => state.isLoadingWords
export const selectGames = (state) => state.bingo.games
