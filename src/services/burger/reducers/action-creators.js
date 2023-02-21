import { createAsyncThunk } from "@reduxjs/toolkit";
import Burger from "../../../utils/api/burger";

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