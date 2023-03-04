import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder } from "../../models/IOrder";
import Burger from "../../utils/api/burger";
import { setDefaultValues } from "../burger/reducers/burger-data-slice";

 
export const createOrderQuery = createAsyncThunk<IOrder, string[], {rejectValue: string}>
  ('order/createOrder',
   async(ids, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
      const response = await Burger.createOrder(ids);
      if (response.data.success) {
        dispatch(setDefaultValues());
        return response.data;
      }
    } catch (err) {
      return rejectWithValue("К сожалению, в процессе создания заказа произошла ошибка...");
    }
  }
)