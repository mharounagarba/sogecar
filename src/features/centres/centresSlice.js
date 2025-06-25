import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCentres = createAsyncThunk('centres/fetch', async () => {
  return await window.api.getCentres()
})

export const centresSlice = createSlice({
  name: 'centres',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCentres.pending, (state) => { state.loading = true })
      .addCase(fetchCentres.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
  }
})

export default centresSlice.reducer
