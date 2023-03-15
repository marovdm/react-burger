import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder } from "../../models/IOrder";
import { IGetOrderInfoResponse } from "../../models/response/order-response";
import Order from "../../utils/api/order";
import { setDefaultValues } from "../burger/reducers/burger-data-slice";
import { viewDetailOrder } from "../feed/actions";

 
export const createOrderQuery = createAsyncThunk<IOrder, string[], {rejectValue: string}>
  ('order/createOrder',
   async(ids, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
      const response = await Order.createOrder(ids);
      if (response.data.success) {
        dispatch(setDefaultValues());
        return response.data;
      }
    } catch (err) {
      return rejectWithValue("К сожалению, в процессе создания заказа произошла ошибка...");
    }
  }
)

export const getOrderInfo = createAsyncThunk<IGetOrderInfoResponse, string, {rejectValue: string}>
  ('order/getOrderInfo',
   async(orderNumber, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
      const response = await Order.getOrderById(orderNumber);
      if (response.data.success) {
        dispatch(viewDetailOrder(response.data.orders[0]));
        return response.data;
      }
    } catch (err) {
      return rejectWithValue("К сожалению, информация о заказе недоступн...");
    }
  }
)