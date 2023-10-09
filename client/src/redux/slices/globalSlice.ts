import { createSlice } from '@reduxjs/toolkit';
// import { IUser } from "~/interface/auth";

export interface IGlobalState {
  isLogin: boolean;
  user: any;
  accessToken: string;
}

const initialState: IGlobalState = {
  isLogin: false,
  user: {} as any,
  accessToken: '',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.data;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.user = {};
      state.isLogin = action.payload;
      state.accessToken = '';
    },
  },
});

export const { login, logout, addViewedItem } = globalSlice.actions;
export default globalSlice.reducer;
