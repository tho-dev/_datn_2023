import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "~/interface/user";

const authApi = createApi({
    reducerPath: "auth",
    tagTypes: ["Auth"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_API_URL,
        // xét token vào headers
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).persistedReducer.global.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
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
            query: (credentials) => ({
                url: `/user/${credentials._id}`,
                method: "PUT",
                body: credentials,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),
        updatePassWord: builder.mutation<any, any>({
            query: (credentials) => ({
                url: `/user/updatePassword/${credentials.id}`,
                method: "PUT",
                body: credentials
            })
        }),
        logoutUser: builder.mutation<any, any>({
            query: (user) => ({
                url: `/user/logout`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ["Auth"]
        }),
    })
});
export const {
    useSigninMutation,
    useSignupMutation,
    useUpdateMutation,
    useUpdatePassWordMutation,
    useLogoutUserMutation
} = authApi;

export const authReducer = authApi.reducer;

export default authApi;
