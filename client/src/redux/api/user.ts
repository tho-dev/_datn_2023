import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, IEmail, IResetPassword } from '~/interface/user';
import { RootState } from '../store';

const authApi = createApi({
  reducerPath: 'auth',
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
    signin: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: `/user/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<{ status: number; message: string }, IUser>({
      query: (credentials) => ({
        url: `/user`,
        method: 'POST',
        body: credentials,
      }),
    }),
    update: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/user/${credentials._id}`,
        method: 'PUT',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    sendOtpResetPassword: builder.mutation<{ status: number; message: string }, IEmail>({
      query: (credentials) => ({
        url: 'user/sent-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassWord: builder.mutation<IResetPassword, Partial<IResetPassword>>({
      query: (credentials) => ({
        url: `/user/resetPassword`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
export const { useSigninMutation, useSignupMutation, useUpdateMutation, useSendOtpResetPasswordMutation, useResetPassWordMutation } = authApi;

export const authReducer = authApi.reducer;

export default authApi;
