import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getDetailProduct } from "~/services/products.service";


// First, create the thunk
export const getDetailProductBySlug = createAsyncThunk(
    'product/fetchBySlug',
    async (slug: string) => {
        const response = await getDetailProduct(slug)
        return response?.data
    }
)

const initialState = {
    product: {},
    loading: false,
    error: null as string | null | undefined
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailProductBySlug.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDetailProductBySlug.fulfilled, (state, action) => {
                // Add user to the state array
                state.product = action.payload
                state.loading = false;
                state.error = null
            })
            .addCase(getDetailProductBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
})

export default productSlice.reducer