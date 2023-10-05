import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
  isLogin: boolean;
  user: any;
  accessToken: string;
  viewedItems: any[];
}

const initialState: IGlobalState = {
  isLogin: false,
  user: {} as any,
  accessToken: "",
  viewedItems: [], 
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
  },
});

export const { login, logout, addViewedItem } = globalSlice.actions;
export default globalSlice.reducer;
