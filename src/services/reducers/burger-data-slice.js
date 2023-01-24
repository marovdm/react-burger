import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { fetchBurgersData } from './action-creators';

const initialState = {
  burgersData: [],
  isLoading: false,
  hasError: false,
  error: '',

  viewedIngredient: {},

  selectedIngredients: [],
  selectedBun: null,

  lastUsedIngredient: null,
  
  isOpenedIngedientDetail: false
}


export const burgersDataSlice = createSlice({
  name: 'burgersData',
  initialState,
  reducers: {
    // Выбранный ингредиент для просмотра
    viewIngredient(state, action) {
      state.viewedIngredient = action.payload;
    },
    // Добавление ингредиента
    selectIngredient(state, action) {
      const currentIngredient = action.payload;
      // если не булка, просто добавляем
      if (currentIngredient?.type !== 'bun') {
        // добавляем уникальный ключ т.к. ингредиенты могут повторяться
        state.selectedIngredients.push(Object.assign( {}, currentIngredient, {'unique': uuidv4()} ));
        state.lastUsedIngredient = currentIngredient;
      } else {
        //если выбрали булку - добавляем новую/заменяем выбранную 
        state.selectedBun = currentIngredient;
      }
    },
    // Удаление ингредиента
    deleteIngredient(state, action) {
      state.lastUsedIngredient = state.selectedIngredients[action.payload];
      state.selectedIngredients.splice(action.payload, 1);
    },
    // Отобржание попапа детального описания ингредиента
    toggleIngedientDetail(state, action) {
      state.isOpenedIngedientDetail = action.payload;
    },
    // Сортировка при перемещении ингредиентов
    sortIngredients(state, action) {
      const {toIndex, fromIndex} = action.payload;
      state.selectedIngredients.splice(toIndex, 0, state.selectedIngredients.splice(fromIndex, 1)[0]);
    },
    setDefaultValues(state, action) {
      state.selectedIngredients = [];
      state.selectedBun = null;
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
});

export const { 
  viewIngredient, 
  selectIngredient, 
  deleteIngredient, 
  sortIngredients, 
  toggleIngedientDetail ,
  setDefaultValues,
} = burgersDataSlice.actions;
export default burgersDataSlice.reducer;