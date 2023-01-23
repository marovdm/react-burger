import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getBurgersData } from "../../utils/burger-api";

export const fetchBurgersData = createAsyncThunk('burgers/fetchData', (_, thunkAPI) => {
  return getBurgersData()
    .then((data) => data)
    .catch(e => thunkAPI.rejectWithValue("В настоящий момент невозможно оформить заказ. Попробуйте позже"));
})

export const createOrderQuery = createAsyncThunk('order/createOrder', (ids, thunkAPI) => {
  return createOrder(ids)
    .then(data => {
      if (data.success) return data.order;
    })
    .catch(e => thunkAPI.rejectWithValue("К сожалению, в процессе создания заказа произошла ошибка..."));
})