import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from '../features/words/wordsSlice'
import testSetupReducer from '../features/test-setup/wordTestSetupSlice'
import testWordReducer from '../features/word-test/testWordSlice'
import testHistoryReducre from '../features/test-history/testHistorySlice'

export default configureStore({
  reducer: {
    words: wordsReducer,
    setting: testSetupReducer,
    test: testWordReducer,
    testHistory: testHistoryReducre,
  },
})
