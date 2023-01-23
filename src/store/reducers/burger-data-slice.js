import { createSlice } from '@reduxjs/toolkit'
import { fetchBurgersData } from './action-creators';

const initialState = {
  burgersData: [],
  isLoading: false,
  hasError: false,
  error: '',

  viewedIngredient: {},

  selectedIngredients: [],
  lastAddedIngredient: null,
  isOpenedIngedientDetail: false
}



export const burgersDataSlice = createSlice({
  name: 'burgersData',
  initialState,
  reducers: {
    viewIngredient(state, action) {
      state.viewedIngredient = action.payload;
    },
    selectIngredient(state, action) {
      state.selectedIngredients = action.payload.selectedIngredients;
      state.lastAddedIngredient = action.payload.last;
    },
    toggleIngedientDetail(state, action) {
      state.isOpenedIngedientDetail = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBurgersData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBurgersData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.burgersData = action.payload;
      state.hasError = false;
      state.error = '';
    })
    builder.addCase(fetchBurgersData.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.error = action.payload;
    })
  }
})

export const { viewIngredient, selectIngredient, toggleIngedientDetail } = burgersDataSlice.actions;
export default burgersDataSlice.reducer;