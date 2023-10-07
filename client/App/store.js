import { configureStore } from '@reduxjs/toolkit'
import testReducer from '../features/word-test/testSlice'

export default configureStore({
  reducer: {
    test: testReducer,
  },
})
