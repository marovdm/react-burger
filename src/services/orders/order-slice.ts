import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createOrderQuery } from './action-creators';

import { IOrder } from "../../models/IOrder";

type OrderState = {
  orderData: IOrder | {};
  isOpenedOrderModal: boolean;
  isLoading: boolean,
  error: string;
  hasError: boolean;
}

const initialState: OrderState = {
  orderData: {},
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
  }
})

export const { toggleOpenedOrderModal } = OrderDataSlice.actions;
export default OrderDataSlice.reducer;