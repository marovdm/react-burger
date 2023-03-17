import { createAsyncThunk } from "@reduxjs/toolkit";
import { IIngredient } from "../../../models/IIngredient";
import Burger from "../../../utils/api/burger";

export const fetchBurgersData = createAsyncThunk<IIngredient[], undefined, {rejectValue: string}>
  ('burgers/fetchData', async (_, thunkAPI) => {
    try {
      const response = await Burger.fetchIngredients();
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("В настоящий момент невозможно оформить заказ. Попробуйте позже");
    }
  }
)