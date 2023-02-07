import { createAsyncThunk } from "@reduxjs/toolkit";
import Profile from "../../../utils/api/profile";
import Auth from "../../../utils/api/auth";

export const fetchUserProfile = createAsyncThunk('user/profile', async (payload, thunkAPI) => {
  try {
    const response = await Profile.fetchProfile(payload);
    if (response.data.success) {
      return response.data.user;
    }
  } catch(e) {
    return thunkAPI.rejectWithValue("Ой, что-то пошло не так... Попробуйте позже")
  }
});

export const userLogin = createAsyncThunk('user/login', async (payload, thunkAPI) => {
  try {
    const res = await Auth.login(payload);   
    console.log('res', res);  
    return res;
  } catch(err) {
    console.log(err);
    const {response} = err;

    if (response.status === 401 && response.data.message === "email or password are incorrect") {
      return thunkAPI.rejectWithValue("Неправильный логин или пароль")
    }
  }
});

export const userRegister = createAsyncThunk('user/register', async (payload, thunkAPI) => {
    try {
      return await Auth.register(payload);     
    } catch(err) {
      const {response} = err;

      if (response.status === 403 && response.data.message === "User already exists") {
        return thunkAPI.rejectWithValue("Пользователь с такими данными уже существует")
      }
    }
});