// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import actesReducer from './features/actes/actesSlice'
import assuresReducer from './features/assures/assuresSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    assures: assuresReducer,
    actes: actesReducer,
  }
})
