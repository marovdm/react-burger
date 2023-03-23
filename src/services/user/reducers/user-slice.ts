import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';
import { fetchUserProfile, userLogin, userLogout, userRegister, } from '../actions/action-creators';

export type UserState = {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  hasError: boolean;
  error: string;
}

const initialState: UserState = {
  user: {
    email: '',
    name: '',
  },
  isAuth: localStorage.getItem('accessToken') ? true : false,
  isLoading: false,
  hasError: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.hasError = true;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.hasError = false;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    // LOGIN USER
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
      state.hasError = false;
      state.error = '';
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      if (action.payload) {
        state.error = action.payload
      }
    })
    
    // REGISTER USER
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
      state.hasError = false;
      state.error = '';
    })
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      if (action.payload) {
        state.error = action.payload
      }
    })

    // GET PROFILE DATA
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.hasError = false;
      state.error = '';
    })
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      if (action.payload) {
        state.error = action.payload
      }
    })

    // LOGOUT
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.user = {
        name: '',
        email: ''
      };
      state.isAuth = false;
      state.isLoading = false;
      state.hasError = false;
      state.error = '';
    })
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      if (action.payload) {
        state.error = action.payload;
      }
    })
  }
})

export const { 
  setCredentials, 
  setLoading,
  setError,
  resetError
} = userSlice.actions;

export default userSlice.reducer;