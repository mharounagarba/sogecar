// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  role: null,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.username
      state.role = action.payload.role
      state.error = null
    },
    loginFailure(state, action) {
      state.user = null
      state.role = null
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.role = null
      state.error = null
    }
  }
})

export const { loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
