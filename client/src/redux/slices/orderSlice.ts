import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isPhoneNumber: '',
  isOrder: true,
  isOtpCode: '',
  idOrder: null,
  visibleListOrder: false,
  isError: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    getAllOrderStart(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getAllOrderSuccess(state, action: any) {
      if (action) {
        console.log('all: ', action);
        state.isLoading = false;
        state.orders = action.payload.data.data;
        state.idOrder = action.payload.data.data[0]._id;
      }
    },
    getAllOrderFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    getOneOrder(state, action: any) {
      console.log('one: ', action);
    },
    sendOtpPhone(state, action) {
      state.isPhoneNumber = action.payload?.data?.phone_number;
      if (action.payload.result.data.status == 200) {
        state.visibleListOrder = true;
        console.log(state.visibleListOrder);
      }
    },
    checkOtpPhone(state, action) {
      state.isOtpCode = action.payload.otp.code;
      console.log(action.payload.result.error.status);
      if (action.payload.result.error.status == 400) {
        state.visibleListOrder = true;
      }
    },
    reset(state) {
      state.orders = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isPhoneNumber = '';
      state.isOrder = true;
      state.isOtpCode = '';
      state.idOrder = null;
      state.visibleListOrder = false;
      state.isError = false;
    },
  },
});
export default orderSlice.reducer;
export const { getAllOrderStart, getAllOrderSuccess, getAllOrderFailure, sendOtpPhone, checkOtpPhone, reset, getOneOrder } = orderSlice.actions;
