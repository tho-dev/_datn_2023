import { createSlice } from "@reduxjs/toolkit";
// import { IUser } from "~/interface/auth";



export interface authState {
    isLogin: boolean;
    user: any;
}

const initialState: authState = {
    isLogin: false,
    user: {} as any
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action);
            state.user = action.payload;
            state.isLogin = true;
        },
        logout: (state, action) => {
            console.log(action);
            state.user = {}
            state.isLogin = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
