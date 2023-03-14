import { createAsyncThunk } from "@reduxjs/toolkit";
import Profile from "../../utils/api/profile";
import Auth from "../../utils/api/auth";
import { IUserResponse, IProfileResponse, ILogoutResponse } from "../../models/response/auth-response";
import { ILoginRequest, IRegisterRequest } from "../../models/request/auth-request";


export const fetchUserProfile = createAsyncThunk<IProfileResponse, undefined, {rejectValue: string}>
  ('user/profile', async (_, thunkAPI) => {
    try {
      const response = await Profile.fetchProfile();
      if (response.data.success) {
        return response.data;
      }
    } catch(e) {
      return thunkAPI.rejectWithValue("Ой, что-то пошло не так... Попробуйте позже")
    }
  }
);

export const userLogin = createAsyncThunk<IUserResponse, ILoginRequest, {rejectValue: string}>
  ('user/login', async (payload, thunkAPI) => {
    try {
      const res = await Auth.login(payload);   
      return res;
    } catch(err: any) {
      const {response} = err;

      if (response.status === 401 && response.data.message === "email or password are incorrect") {
        return thunkAPI.rejectWithValue("Неправильный логин или пароль")
      }
    }
  }
);

export const userRegister = createAsyncThunk<IUserResponse, IRegisterRequest, {rejectValue: string}>
  ('user/register', async (payload, thunkAPI) => {
      try {
        return await Auth.register(payload);     
      } catch(err: any) {
        const {response} = err;

        if (response.status === 403 && response.data.message === "User already exists") {
          return thunkAPI.rejectWithValue("Пользователь с такими данными уже существует")
        }
      }
  }
);

export const userLogout = createAsyncThunk<ILogoutResponse, undefined, {rejectValue: string}>
  ('user/logout', async () => {
    try {
      const token = localStorage.getItem('refreshToken');
      if (token) {
        return await Auth.logout(token);
      };
    } catch(err) {
      return err;
    }
  }
);