import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 🔄 Récupération de tous les utilisateurs (depuis SQLite via preload.js)
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await window.api.getUsers()
})

// ➕ Création d'un nouvel utilisateur
export const addUser = createAsyncThunk('users/addUser', async (user) => {
  return await window.api.createUser(user)
})

// 
export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  return await window.api.updateUser(user)
})
// ❌ Suppression d'un utilisateur par ID
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await window.api.deleteUser(id)
  return id // on retourne juste l'id pour le supprimer du state
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // ✅ addUser
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })

      // ✅ deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u.id !== action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
  const index = state.list.findIndex(u => u.id === action.payload.id)
  if (index !== -1) state.list[index] = action.payload
})
  }
})

export default usersSlice.reducer
