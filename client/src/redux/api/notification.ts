import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

const notificationApi = createApi({
	reducerPath: "notification",
	baseQuery: baseQuery,
	tagTypes: ["NotificationTag"],
	endpoints: (build) => ({
		getAll: build.query({
			query: (query) => `/notification?${objectToUrlParams(query)}`,
			providesTags: ["NotificationTag"],
		}),
		getById: build.query({
			query: (id) => `/notification/${id}`,
		}),
		addNoti: build.mutation<any, any>({
			query: (body) => ({
				url: `/notification`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["NotificationTag"],
		}),
		updateNoti: build.mutation<any, any>({
			query: (id) => ({
				url: `/notification/${id}`,
				method: "PUT",
			}),
			invalidatesTags: ["NotificationTag"],
		}),
	}),
});

export const { useAddNotiMutation, useGetAllQuery, useGetByIdQuery, useUpdateNotiMutation } = notificationApi;

export default notificationApi;
