import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDemand } from "~/interface/demand";

 

const demandApi = createApi({
	reducerPath: "demand",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.VITE_API_URL + "/demand",
	}),
	tagTypes: ["DemandTag"],
	endpoints: (build) => ({
		getAllDemand: build.query({
			query: () => `/`,
			providesTags: ["DemandTag"],
		}),
		getSingleDemand: build.query({
			query: (id) => `/${id}`,
		}),
		createDemand: build.mutation<any, IDemand>({
			query: (body) => ({
				url: ``,
				method: "POST",
				body,
			}),
			invalidatesTags: ["DemandTag"],
		}),
		updateDemand: build.mutation<any, { _id: number }>({
			query: ({ _id, ...patch }) => ({
				url: `/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["DemandTag"],
		}),
		deleteDemand: build.mutation<any, number>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["DemandTag"],
		}),
	}),
});

export const {
	useGetAllDemandQuery,
	useGetSingleDemandQuery,
	useCreateDemandMutation,
	useDeleteDemandMutation,
	useUpdateDemandMutation,
} = demandApi;

export default demandApi;
