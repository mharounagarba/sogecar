// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import usersReducer from './features/auth/usersSlice'
import actesReducer from './features/actes/actesSlice'
import assuresReducer from './features/assures/assuresSlice'
import beneficiairesReducer from './features/beneficiaires/beneficiairesSlice'
import centresReducer from './features/centres/centresSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    assures: assuresReducer,
    actes: actesReducer,
    beneficiaires: beneficiairesReducer,
     centres: centresReducer,
  }
})
