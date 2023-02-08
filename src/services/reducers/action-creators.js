import { createAsyncThunk } from "@reduxjs/toolkit";
import Burger from "../../utils/api/burger";
import { setDefaultValues } from "./burger-data-slice";

export const fetchBurgersData = createAsyncThunk('burgers/fetchData', async (_, thunkAPI) => {
  try {
    const response = await Burger.fetchIngredients();
    if (response.data.success) {
      return response.data.data;
    }
  } catch (err) {
    return thunkAPI.rejectWithValue("В настоящий момент невозможно оформить заказ. Попробуйте позже");
  }
})

export const createOrderQuery = createAsyncThunk('order/createOrder', async(ids, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI;
  try {
    const response = await Burger.createOrder(ids);
    if (response.data.success) {
      dispatch(setDefaultValues());
      return response.data.order;
    }
  } catch (err) {
    return rejectWithValue("К сожалению, в процессе создания заказа произошла ошибка...");
  }
})