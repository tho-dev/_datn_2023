import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

const adsApi = createApi({
	reducerPath: "ads",
	tagTypes: ["Ads"],
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getAll: builder.query({
			query: (query) => ({
				url: `/mail?${objectToUrlParams(query)}`,
				method: "GET",
			}),
			providesTags: ["Ads"],
		}),
		getOne: builder.query({
			query: (id) => ({
				url: `/mail/${id}`,
				method: "GET",
			}),
			providesTags: ["Ads"],
		}),
		add: builder.mutation<any, any>({
			query: (data) => ({
				url: `/mail`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Ads"],
		}),
		remove: builder.mutation<any, any>({
			query: (jobId) => ({
				url: `/mail/${jobId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Ads"],
		}),
	}),
});

export const { useAddMutation, useGetAllQuery, useGetOneQuery, useRemoveMutation } = adsApi;

export const adsReducer = adsApi.reducer;

export default adsApi;
