import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchActes = createAsyncThunk('actes/fetch', async () => {
  return await window.api.getActes()
})

export const addActe = createAsyncThunk('actes/add', async (acte) => {
  console.log(acte);
  
  await window.api.addActe(acte)
  return acte
})

export const deleteActe = createAsyncThunk('actes/delete', async (id) => {
  await window.api.deleteActe(id)
  return id
})

const actesSlice = createSlice({
  name: 'actes',
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActes.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(addActe.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
      .addCase(deleteActe.fulfilled, (state, action) => {
        state.list = state.list.filter(a => a.id !== action.payload)
      })
  }
})

export default actesSlice.reducer
