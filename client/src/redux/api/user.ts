import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "~/utils/fc";
import { IUser, IEmail } from '~/interface/user';

const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['Auth'],
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
        url: `/user?${objectToUrlParams(query)}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getOne: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    signin: builder.mutation<any, { email: string, password: string }>({
      query: (credentials) => ({
        url: `/user/login`,
        method: "POST",
        body: credentials
      })
    }),
    signup: builder.mutation<{ status: number, message: string }, IUser>({
      query: (credentials) => ({
        url: `/user`,
        method: "POST",
        body: credentials
      })
    }),
    update: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"]
    }),
    updatePassWord: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        url: `/user/updatePassword/${id}`,
        method: "PUT",
        body: data
      })
    }),
    logoutUser: builder.mutation<any, any>({
      query: () => ({
        url: `/user/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Auth"]
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation<IEmail, Partial<IEmail>>({
      query: (credentials) => ({
        url: `/user/resetPassword`,
        method: 'POST',
        body: credentials,
      }),
    }),
    sendOtpResetPassword: builder.mutation<IEmail, Partial<IEmail>>({
      query: (credentials) => ({
        url: `/user/sent-otp`,
        method: 'POST',
        body: credentials,
      }),
    }),
  })
});

export const {
  useGetAllQuery,
  useSigninMutation,
  useSignupMutation,
  useUpdateMutation,
  useUpdatePassWordMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
  useGetOneQuery,
  useResetPasswordMutation,
  useSendOtpResetPasswordMutation
} = authApi;

export const authReducer = authApi.reducer;

export default authApi;
