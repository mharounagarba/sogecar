import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 👉 Récupère les bénéficiaires d’un assuré
export const fetchBeneficiairesByMatricule = createAsyncThunk(
  'beneficiaires/fetchByMatricule',
  async (matricule) => {
    return await window.api.getBeneficiaires(matricule)
  }
)

export const beneficiairesSlice = createSlice({
  name: 'beneficiaires',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addBeneficiaire(state, action) {
      state.list.push(action.payload)
    },
    deleteBeneficiaire(state, action) {
      state.list = state.list.filter(b => b.id !== action.payload)
    },
    updateBeneficiaire(state, action) {
      const index = state.list.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    clearBeneficiaires(state) {
      state.list = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBeneficiairesByMatricule.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBeneficiairesByMatricule.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchBeneficiairesByMatricule.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const {
  addBeneficiaire,
  deleteBeneficiaire,
  updateBeneficiaire,
  clearBeneficiaires
} = beneficiairesSlice.actions

export default beneficiairesSlice.reducer
