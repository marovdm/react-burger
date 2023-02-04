import { createSlice } from '@reduxjs/toolkit';
import { userRegister } from './action-creators';

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
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userRegister.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.hasError = false;
      state.error = '';
    })
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.error = action.payload;
    })
  }
})

export default userSlice.reducer;