import { createAsyncThunk } from "@reduxjs/toolkit";
import Profile from "../../../utils/api/profile";
import Auth from "../../../utils/api/auth";
import { IUser } from "../../../models/IUser";

type loginRequest = {
  email: string,
  password: string
};

type responseType = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string,
    name: string
  }
};

type registerRequest = {
  name: string;
} & loginRequest;

type ProfileResponse = {
  user: IUser;
  success: boolean;
}

type logoutRequest = {
  token: string;
}

type logoutResponse = {
  success: boolean;
  message: string;
}

export const fetchUserProfile = createAsyncThunk<ProfileResponse, undefined, {rejectValue: string}>
  ('user/profile', async (payload, thunkAPI) => {
    try {
      const response = await Profile.fetchProfile(payload);
      if (response.data.success) {
        return response.data;
      }
    } catch(e) {
      return thunkAPI.rejectWithValue("Ой, что-то пошло не так... Попробуйте позже")
    }
  }
);

export const userLogin = createAsyncThunk<responseType, loginRequest, {rejectValue: string}>
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

export const userRegister = createAsyncThunk<responseType, registerRequest, {rejectValue: string}>
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

export const userLogout = createAsyncThunk<logoutResponse, logoutRequest, {rejectValue: string}>
  ('user/logout', async () => {
    try {
      const token = localStorage.getItem('refreshToken');

      return await Auth.logout(token);
    } catch(err) {
      return err;
    }
  }
);