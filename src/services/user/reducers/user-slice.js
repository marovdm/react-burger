import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile, } from './action-creators';

const initialState = {
  user: {
    email: '',
    password: '',
    name: '',
  },
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
    setAuth: (state, action) => {
      state.isAuth = action.payload;
      state.hasError = false;
      state.error = '';
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.hasError = true;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    // GET PROFILE DATA
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      console.log(action);
      state.user = action.payload;
      state.isLoading = false;
      state.hasError = false;
      state.error = '';
    })
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      console.log('rejected',action);
      state.isLoading = false;
      state.hasError = true;
      state.error = action.payload;
    })
  }
})

export const { 
  setCredentials, 
  setAuth,
  setLoading,
  setError
} = userSlice.actions;
export default userSlice.reducer;