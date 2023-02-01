import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getBurgersData } from "../../utils/api/burger-api";
import { setDefaultValues } from "./burger-data-slice";

export const fetchBurgersData = createAsyncThunk('burgers/fetchData', (_, thunkAPI) => {
  return getBurgersData()
    .then((data) => data)
    .catch(e => thunkAPI.rejectWithValue("В настоящий момент невозможно оформить заказ. Попробуйте позже"));
})

export const createOrderQuery = createAsyncThunk('order/createOrder', (ids, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI;
  return createOrder(ids)
    .then(data => {
      if (data.success) {
        dispatch(setDefaultValues());
        return data.order;
      }
    })
    .catch(e => rejectWithValue("К сожалению, в процессе создания заказа произошла ошибка..."));
})