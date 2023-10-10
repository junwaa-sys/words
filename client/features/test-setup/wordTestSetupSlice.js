import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../Apis/wordTest'

const initialState = {
  testSetup: [],
  isLoadingSettings: false,
  isLoadingAddSettings: false,
  isLoadingUpdateSettings: false,
  failedToUpdateSettings: false,
  failedToAddSettings: false,
  failedToSettings: false,
}

export const loadSettings = createAsyncThunk(
  'test-settup/fetchSettings',
  async (token) => {
    const response = await api.fetchTestSetting(token)
    return response
  }
)

export const addSettings = createAsyncThunk(
  'test-setting/addSettings',
  async (data) => {
    const response = await api.addTestSetting(data)
    return response
  }
)

export const updateSettings = createAsyncThunk(
  'test-setup/updateSettings',
  async (data) => {
    const response = await api.updateTestSetting(data)
    return response
  }
)

const testSettingSlice = createSlice({
  name: 'testSetup',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(loadSettings.pending, (state, action) => {
      state.isLoadingSettings = true
    })
    builder.addCase(loadSettings.fulfilled, (state, action) => {
      state.isLoadingSettings = false
      state.testSetup = [...action.payload]
    })
    builder.addCase(loadSettings.rejected, (state, action) => {
      state.isLoadingSettings = false
      state.failedToSettings = true
    })
    builder.addCase(addSettings.pending, (state, action) => {
      state.isLoadingAddSettings = true
    })
    builder.addCase(addSettings.fulfilled, (state, action) => {
      state.isLoadingAddSettings = false
    })
    builder.addCase(addSettings.rejected, (state, action) => {
      state.isLoadingAddSettings = false
      state.failedToAddSettings = true
    })
    builder.addCase(updateSettings.pending, (state, action) => {
      state.isLoadingUpdateSettings = true
    })
    builder.addCase(updateSettings.fulfilled, (state, action) => {
      state.isLoadingUpdateSettings = false
    })
    builder.addCase(updateSettings.rejected, (state, action) => {
      state.isLoadingUpdateSettings = false
      state.failedToUpdatedSettings = true
    })
  },
})

export const selectSettings = (state) => state.testSetup
export const isLoadingSettings = (state) => state.testSetup.isLoadingSettings
export const isLoadingUpdateSettings = (state) =>
  state.testSetup.isLoadingUpdateSettings
export const isLoadingAddSettings = (state) =>
  state.testsetup.isLoadingAddSettings
export default testSettingSlice.reducer
