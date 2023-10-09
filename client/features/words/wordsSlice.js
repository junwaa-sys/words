import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../Apis/words'

const initialState = {
  words: [],
  isLoadingWords: false,
  failedToLoadWords: false,
  isLoadingAddWord: false,
  failedToAddWord: false,
}

export const loadWords = createAsyncThunk(
  'words/fetchAllWords',
  async (token, thunkAPI) => {
    const response = await api.fetchWords(token)
    return response
  }
)

export const addWord = createAsyncThunk(
  'words/addWord',
  async (token, thunkAPI) => {
    const response = await api.addWord(token)
    return response
  }
)

const wordsSlice = createSlice({
  name: 'words',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(loadWords.pending, (state, action) => {
      state.isLoadingWords = true
    })
    builder.addCase(loadWords.fulfilled, (state, action) => {
      state.isLoadingWords = false
      state.words = [...action.payload]
    })
    builder.addCase(loadWords.rejected, (state, action) => {
      state.failedToLoadWords = true
    })
    builder.addCase(addWord.pending, (state, action) => {
      state.isLoadingAddWord = true
    })
    builder.addCase(addWord.fulfilled, (state, action) => {
      state.isLoadingAddWord = false
    })
    builder.addCase(addWord.rejected, (state, action) => {
      state.failedToAddWord = true
    })
  },
})

export const selectWords = (state) => state.words.words
export const isLoadingWords = (state) => state.words.isLoadingWords
export const isLoadingAddWord = (state) => state.words.isLoadingAddWord
export default wordsSlice.reducer
