import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from '../features/words/wordsSlice'
import testSetupReducer from '../features/test-setup/wordTestSetupSlice'
import testWordReducer from '../features/word-test/testWordSlice'

export default configureStore({
  reducer: {
    words: wordsReducer,
    setting: testSetupReducer,
    test: testWordReducer,
  },
})
