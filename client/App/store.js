import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from '../features/words/wordsSlice'

export default configureStore({
  reducer: {
    words: wordsReducer,
  },
})
