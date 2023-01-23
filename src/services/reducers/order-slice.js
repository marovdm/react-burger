import { createSlice } from '@reduxjs/toolkit'
import { createOrderQuery } from './action-creators';

const initialState = {
  order: null,
  isOpenedOrderModal: false,
  isLoading: false,
  error: '',
  hasError: false,
}

export const OrderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    toggleOpenedOrderModal(state, action) {
      state.isOpenedOrderModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderQuery.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(createOrderQuery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      state.error = '';
      state.isOpenedOrderModal = true;
    })
    builder.addCase(createOrderQuery.rejected, (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isOpenedOrderModal = true;
    })
  }
})

export const { toggleOpenedOrderModal } = OrderDataSlice.actions;
export default OrderDataSlice.reducer;