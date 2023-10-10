import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';



const productApi = createApi({
    reducerPath: "product",
    tagTypes: ['product'],
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
        getBySlug: builder.query<any, string>({
            query: (slug) => ({
                url: `/product/${slug}`,
                method: "GET",
            }),
            providesTags: (result, error, slug) => [{ type: 'product', slug }]
        }),
    })
});
export const {
    useGetBySlugQuery,
} = productApi;

export const productReducer = productApi.reducer;

export default productApi