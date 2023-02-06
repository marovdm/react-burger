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

export const userRegister = createAsyncThunk('user/register', async (payload, thunkAPI) => {
    try {
      const response = await Auth.register(payload);
      if (response.data.success) {
        const {user, accessToken, refreshToken} = response.data;
        const authToken = accessToken.split('Bearer ')[1];
        localStorage.setItem('accessToken', authToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        return user;
      }
    } catch(e) {
      return thunkAPI.rejectWithValue("Ой, что-то пошло не так... Попробуйте позже")
    }
});