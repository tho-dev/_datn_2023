import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isPhoneNumber: '',
  isOrder: true,
  isOtpCode: '',

  visibleListOrder: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    getAllOrder(state) {
      state.orders = [];
    },
    sendOtpPhone(state, action) {
      state.isPhoneNumber = action.payload?.phone_number;
    },
    checkOtpPhone(state, action) {
      state.isOtpCode = action.payload.otp.code;
      console.log(action.payload.result.error.status);
      if (action.payload.result.error.status == 400) {
        state.visibleListOrder = false;
      }
    },
    resetOtpPhone(state) {
      state.visibleListOrder = true;
      state.isOtpCode = '';
      state.orders = [];
    },
  },
});
export default orderSlice.reducer;
export const { getAllOrder, sendOtpPhone, checkOtpPhone, resetOtpPhone } = orderSlice.actions;
