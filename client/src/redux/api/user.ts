import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '~/interface/user';



const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_API_URL
    }),
    endpoints: (builder) => ({
        signin: builder.mutation<{ accessToken: string, user: {} }, { email: string, password: string }>({
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
            query: (credentials) => ({
                url: `/user/${credentials._id}`,
                method: "PUT",
                body: credentials
            })
        }),
        updatePassWord: builder.mutation<any, any>({
            query: (credentials) => ({
                url: `/user/updatePassword/${credentials.id}`,
                method: "PUT",
                body: credentials
            })
        }),
    })
});

export const {
    useSigninMutation,
    useSignupMutation,
    useUpdateMutation,
    useUpdatePassWordMutation
} = authApi;

export const authReducer = authApi.reducer;

export default authApi