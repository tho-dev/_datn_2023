import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';



const cartApi = createApi({
    reducerPath: "cart",
    tagTypes: ['Cart', "Auth"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_API_URL,
        // xét token vào headers
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).persistedReducer.global.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        addToCart: builder.mutation<any, any>({
            query: (data) => ({
                url: `/cart`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Cart"]
        }),
        createCart: builder.mutation<any, any>({
            query: (data) => ({
                url: `/cart/create`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Cart"]
        }),
        increment: builder.mutation<any, any>({
            query: (data) => ({
                url: `/cart/deleteOne/${data.sku_id}`,
                method: "DELETE",
                body: data
            }),
            invalidatesTags: ["Cart"]
        }),
        decrement: builder.mutation<any, any>({
            query: (data) => ({
                url: `/cart/addOne/${data.sku_id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Cart"]
        }),

        getCart: builder.query<any, string>({
            query: (cart_id) => ({
                url: `/cart/${cart_id}`,
                method: "GET",
            }),
            providesTags: (result, error, cart_id) => [{ type: 'Cart', cart_id }],
        }),
        getCartByUserId: builder.mutation<any, any>({
            query: (user_id) => ({
                url: `/cart/user/${user_id}`,
                method: "POST",
            }),
            invalidatesTags: ["Cart"]
        }),
        remove: builder.mutation<any, any>({
            query: (data) => ({
                url: `/cart/${data.sku_id}`,
                method: "DELETE",
                body: data
            }),
            invalidatesTags: ["Cart"]
        }),
    })
});
export const {
    useAddToCartMutation,
    useGetCartQuery,
    useDecrementMutation,
    useIncrementMutation,
    useRemoveMutation,
    useGetCartByUserIdMutation,
    useCreateCartMutation
} = cartApi;

export const productReducer = cartApi.reducer;

export default cartApi