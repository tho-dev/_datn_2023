import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

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
		getDashboard: build.query({
			query: () => "/dashboard",
			transformResponse: (res: any) => res?.data,
		}),
		getRevenueStatistics: build.query({
			query: ({ period }) => `/revenue-statistics?${objectToUrlParams({ period })}`,
			transformResponse: (res: any) => res?.data,
		}),
	}),
});

export const {
	useGetGeneralQuery,
	useUpdateGeneralMutation,
	useGetHomeSettingsQuery,
	useGetDashboardQuery,
	useGetRevenueStatisticsQuery,
} = generalApi;

export default generalApi;
