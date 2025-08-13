import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchAssures = createAsyncThunk('assures/fetch', async () => {
  return await window.api.getAssures()
})

export const addAssure = createAsyncThunk('assures/add', async (data) => {
  await window.api.addAssure(data)
  return data
})

const assuresSlice = createSlice({
  name: 'assures',
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssures.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(addAssure.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
  }
})

export default assuresSlice.reducer
