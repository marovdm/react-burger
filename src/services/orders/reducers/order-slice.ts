import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createOrderQuery, getOrderInfo } from '../actions/action-creators';

import { IOrder } from "../../../models/IOrder";

export type OrderState = {
  orderData: IOrder | null
  isOpenedOrderModal: boolean;
  isLoading: boolean,
  error: string;
  hasError: boolean;
}

export const initialState: OrderState = {
  orderData: null,
  isOpenedOrderModal: false,
  isLoading: false,
  error: '',
  hasError: false,
}

export const OrderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    toggleOpenedOrderModal(state, action: PayloadAction<boolean>) {
      state.isOpenedOrderModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderQuery.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(createOrderQuery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderData = action.payload;
      state.error = '';
      state.isOpenedOrderModal = true;
    })
    builder.addCase(createOrderQuery.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload
      }
      state.isOpenedOrderModal = true;
    })
    builder.addCase(getOrderInfo.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getOrderInfo.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    })
    builder.addCase(getOrderInfo.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload
      }
    })
  }
})

export const { toggleOpenedOrderModal } = OrderDataSlice.actions;
export default OrderDataSlice.reducer;