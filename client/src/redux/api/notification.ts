import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "~/utils/fc";

const notificationApi = createApi({
    reducerPath: "notification",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_API_URL + "/notification",
    }),
    tagTypes: ["NotificationTag"],
    endpoints: (build) => ({
        getAll: build.query({
            query: (query) => `?${objectToUrlParams(query)}`,
            providesTags: ["NotificationTag"],
        }),
        getById: build.query({
            query: (id) => `/${id}`,
        }),
        addNoti: build.mutation<any, any>({
            query: (body) => ({
                url: ``,
                method: "POST",
                body,
            }),
            invalidatesTags: ["NotificationTag"],
        }),
        updateNoti: build.mutation<any, any>({
            query: (id) => ({
                url: `/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["NotificationTag"],
        }),
    }),
});

export const {
    useAddNotiMutation,
    useGetAllQuery,
    useGetByIdQuery,
    useUpdateNotiMutation
} = notificationApi;

export default notificationApi;
