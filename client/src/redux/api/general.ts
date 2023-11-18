import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "~/utils/fc";

const generalApi = createApi({
	reducerPath: "general",
	baseQuery: baseQuery,
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
