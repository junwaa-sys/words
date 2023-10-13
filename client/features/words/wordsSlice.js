import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../Apis/words'

const initialState = {
  words: [],
  isLoadingWords: false,
  failedToLoadWords: false,
  isLoadingAddWord: false,
  failedToAddWord: false,
  isLoadingEditWord: false,
  failedToEditWord: false,
}

export const loadWords = createAsyncThunk(
  'words/fetchAllWords',
  async (token) => {
    const response = await api.fetchWords(token)
    return response
  }
)

export const addWord = createAsyncThunk(
  'words/addWord',
  async (data, thunkAPI) => {
    const response = await api.addWord(data)
    return response
  }
)

export const editWord = createAsyncThunk(
  'words/editWord',
  async (data, thunkAPI) => {
    const response = await api.editWord(data)
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
    builder.addCase(editWord.pending, (state, action) => {
      state.isLoadingEditWord = true
    })
    builder.addCase(editWord.fulfilled, (state, action) => {
      state.isLoadingEditWord = false
    })
    builder.addCase(editWord.rejected, (state, action) => {
      state.failedToEditWord = true
    })
  },
})

export const selectWords = (state) => state.words.words
export const isLoadingWords = (state) => state.words.isLoadingWords
export const isLoadingAddWord = (state) => state.words.isLoadingAddWord
export const isLoadingEditWord = (state) => state.words.isLoadingEditWord
export default wordsSlice.reducer
