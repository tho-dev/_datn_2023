import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
	isLogin: boolean;
	user: any;
	accessToken: string;
	viewedItems: any[];
	time: number;
	isCheckOtp: boolean;
	isLoading: boolean;
	homeSettings: any;
}

const initialState: IGlobalState = {
	isLogin: false,
	user: {} as any,
	accessToken: "",
	viewedItems: [],
	time: 0,
	isCheckOtp: false,
	isLoading: false,
	homeSettings: {},
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
			const findEx = state.viewedItems.find((item: any) => item._id == action.payload._id);
			if (findEx) {
				return;
			} else {
				state.viewedItems.push(action.payload);
			}
		},
		setTime: (state, action: PayloadAction<any>) => {
			state.time = action.payload;
		},
		setOtp: (state, action: PayloadAction<any>) => {
			state.isCheckOtp = action.payload;
		},
		setCheckOtp: (state, action: PayloadAction<any>) => {
			state.time = action.payload;
			state.isCheckOtp = true;
		},
		resetOtp: (state, action: PayloadAction<any>) => {
			state.time = 0;
			state.isCheckOtp = action.payload;
		},
		setIsLoading: (state, action: PayloadAction<any>) => {
			const { loading } = action.payload;
			state.isLoading = loading;
		},
		setHomeSetting: (state, action: PayloadAction) => {
			state.homeSettings = action.payload;
		},
	},
});

export const { login, logout, addViewedItem, setTime, setOtp, setCheckOtp, resetOtp, setIsLoading, setHomeSetting } =
	globalSlice.actions;
export default globalSlice.reducer;
