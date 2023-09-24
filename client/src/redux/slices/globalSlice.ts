import { createSlice } from "@reduxjs/toolkit";
// import { IUser } from "~/interface/auth";



export interface IGlobalState {
    isLogin: boolean;
    user: any;
}

const initialState: IGlobalState = {
    isLogin: false,
    user: {} as any
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
        },
        logout: (state, action) => {
            state.user = {}
            state.isLogin = action.payload;
        },
    },
});

export const { login, logout } = globalSlice.actions;
export default globalSlice.reducer;
