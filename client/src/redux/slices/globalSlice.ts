import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
  isLogin: boolean;
  user: any;
  accessToken: string;
  viewedItems: any[];
  time: number,
  isCheckOtp: boolean;
}

const initialState: IGlobalState = {
  isLogin: false,
  user: {} as any,
  accessToken: "",
  viewedItems: [],
  time: 0,
  isCheckOtp: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ data: any; accessToken: string }>) => {
      state.user = action.payload.data;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = {};
      state.isLogin = false;
      state.accessToken = "";
    },
    addViewedItem: (state, action: PayloadAction<any>) => {
      state.viewedItems = [action.payload, ...state.viewedItems];
    },
    setTime: (state, action: PayloadAction<any>) => {
      state.time = action.payload
    },
    setOtp: (state, action: PayloadAction<any>) => {
      state.isCheckOtp = action.payload;
    },
    setCheckOtp: (state, action: PayloadAction<any>) => {
      state.time = action.payload;
      state.isCheckOtp = true;
    }
  },
});

export const { login, logout, addViewedItem, setTime, setOtp, setCheckOtp } = globalSlice.actions;
export default globalSlice.reducer;
