import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "~/utils/fc";


const adsApi = createApi({
    reducerPath: "ads",
    tagTypes: ["Ads"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_API_URL,
        // xét token vào headers
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).persistedReducer.global.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAll: builder.query({
            query: (query) => ({
                url: `/ads?${objectToUrlParams(query)}`,
                method: "GET",
            }),
            providesTags: ["Ads"],
        }),
        getOne: builder.query({
            query: (id) => ({
                url: `/ads/${id}`,
                method: "GET",
            }),
            providesTags: ["Ads"],
        }),
        add: builder.mutation<any, any>({
            query: (data) => ({
                url: `/ads`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Ads"]
        }),
        remove: builder.mutation<any, any>({
            query: (jobId) => ({
                url: `/ads/${jobId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Ads"],
        })
    })
})

export const {
    useAddMutation,
    useGetAllQuery,
    useGetOneQuery,
    useRemoveMutation
} = adsApi

export const adsReducer = adsApi.reducer;

export default adsApi