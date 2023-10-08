import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLoading: false,
  isSuccess: false,
  isEmail: null,
  isOtpCode: null,
};

const authSlice = createSlice({
  name: 'auth',
  reducers: {
    resetForm(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isEmail = null;
      state.isOtpCode = null;
    },
    resetPassword(state, action) {
      state.isEmail = action.payload.email;
      state.isOtpCode = action.payload.result.data;
    },
  },
  initialState: initialState,
});
export default authSlice.reducer;
export const { resetForm, resetPassword } = authSlice.actions;
