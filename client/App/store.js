import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from '../features/words/wordsSlice'
import testReducer from '../features/spell-test-setup/wordTestSetupSlice'

export default configureStore({
  reducer: {
    words: wordsReducer,
    testSettings: testReducer,
  },
})
