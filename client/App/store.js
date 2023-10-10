import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from '../features/words/wordsSlice'
import testSetupReducer from '../features/test-setup/WordTestSetup'

export default configureStore({
  reducer: {
    words: wordsReducer,
    setting: testSetupReducer,
  },
})
