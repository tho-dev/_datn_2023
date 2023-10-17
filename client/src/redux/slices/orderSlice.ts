import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'user',
  initialState: initialState,

  reducers: {
    getAllOrder(state) {
      state.orders = [];
    },
  },
});
export default orderSlice.reducer;
export const { getAllOrder } = orderSlice.actions;
