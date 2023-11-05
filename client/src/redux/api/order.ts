import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { objectToUrlParams } from '~/utils/fc';

const orderApi = createApi({
  reducerPath: 'order',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_API_URL,
    // xét token vào headers
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).persistedReducer.global.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllShipping: builder.query({
      query: (data) => ({
        url: `/order/shipping?q=${data}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    getAll: builder.query({
      query: () => ({
        url: `/order`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    getAllOrder: builder.query({
      query: (query) => ({
        url: `/order?${objectToUrlParams(query)}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    getAllTotalOrder: builder.query({
      query: () => ({
        url: `/order/statistical`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    getOrderByUserId: builder.query({
      query: (id) => ({
        url: `/order/orderByUserId/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    getOneShipping: builder.query({
      query: ({ id }) => ({
        url: `/order/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    create: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    sendOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/send-otp`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    checkOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/verify-otp`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    paymentMomo: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/pay-momo`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    paymentStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/payment-status`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    cancelOrder: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/order/cancel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
    tokenPrintOrder: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/getTokenPrintBill`,
        method: 'POST',
        body: data,
      }),
    }),
    updateStatusOrder: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/updateStatus/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    updateinfoCustomer: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/updateInfoCustomer/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    returnOrder: builder.mutation<any, any>({
      query: (data) => ({
        url: `/order/return`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});
export const {
  useGetAllQuery,
  useGetAllOrderQuery,
  useGetAllShippingQuery,
  useGetOneShippingQuery,
  useGetAllTotalOrderQuery,
  useCreateMutation,
  useSendOtpMutation,
  useCheckOtpMutation,
  usePaymentMomoMutation,
  usePaymentStatusMutation,
  useCancelOrderMutation,
  useTokenPrintOrderMutation,
  useUpdateStatusOrderMutation,
  useGetOrderByUserIdQuery,
  useReturnOrderMutation,
  useUpdateinfoCustomerMutation,
} = orderApi;

export const productReducer = orderApi.reducer;

export default orderApi;
