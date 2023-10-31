import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "~/utils/fc";

const generalApi = createApi({
	reducerPath: "general",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.VITE_API_URL,
	}),
	tagTypes: ["GeneralTag"],
	endpoints: (build) => ({
		getGeneral: build.query({
			query: () => `/general`,
			providesTags: ["GeneralTag"],
		}),
		updateGeneral: build.mutation({
			query: (body) => ({
				url: `/general`,
				method: "PUT",
				body: body,
			}),
			invalidatesTags: ["GeneralTag"],
		}),
		getHomeSettings: build.query({
			query: () => "/home-settings",
		}),
	}),
});

export const { useGetGeneralQuery, useUpdateGeneralMutation, useGetHomeSettingsQuery } = generalApi;

export default generalApi;
