import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../../../utils/api/user-api";

export const userRegister = createAsyncThunk('user/register', (payload, thunkAPI) => {
  return registerUser(payload)
    .then((data) => {
      if (data.success) return data.user;
      // рабоать с локал сторедж
    })
    .catch(e => thunkAPI.rejectWithValue("Ой, что-то пошло не так... Попробуйте позже"));
})