import { createSlice } from "@reduxjs/toolkit";
// import { IUser } from "~/interface/auth";



export interface ICartState {
    carts: any;

}

const initialState: ICartState = {
    carts: "",
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.carts = action.payload;
        },
        removeCart: (state, action) => {
            state.carts = action.payload;
        }
    },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
