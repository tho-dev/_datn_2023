import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';



const orderApi = createApi({
    reducerPath: "order",
    tagTypes: ['Order'],
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
        create: builder.mutation<any, any>({
            query: (data) => ({
                url: `/order`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Order"]
        }),
        sendOtp: builder.mutation<any, any>({
            query: (data) => ({
                url: `/order/send-otp`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Order"]
        }),
        checkOtp: builder.mutation<any, any>({
            query: (data) => ({
                url: `/order/verify-otp`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Order"]
        }),
        paymentMomo: builder.mutation<any, any>({
            query: (data) => ({
                url: `/order/pay-momo`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Order"]
        }),
        paymentStatus: builder.mutation<any, any>({
            query: (data) => ({
                url: `/order/payment-status`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Order"]
        }),
    })
});
export const {
    useCreateMutation,
    useSendOtpMutation,
    useCheckOtpMutation,
    usePaymentMomoMutation,
    usePaymentStatusMutation
} = orderApi;

export const productReducer = orderApi.reducer;

export default orderApi