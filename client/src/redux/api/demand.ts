import { createApi } from "@reduxjs/toolkit/query/react";
import { IDemand } from "~/interface/demand";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
};

const demandApi = createApi({
	reducerPath: "demand",
	baseQuery: baseQuery,
	tagTypes: ["DemandTag"],
	endpoints: (build) => ({
		getAllDemand: build.query({
			query: (query: TQuery) => `/demand?${objectToUrlParams(query)}`,
			providesTags: ["DemandTag"],
		}),
		getSingleDemand: build.query({
			query: (id) => `/demand/${id}`,
		}),
		createDemand: build.mutation<any, IDemand>({
			query: (body) => ({
				url: `/demand`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["DemandTag"],
		}),
		updateDemand: build.mutation<any, { _id: number }>({
			query: ({ _id, ...patch }) => ({
				url: `/demand/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["DemandTag"],
		}),
		deleteDemand: build.mutation<any, number>({
			query: (id) => ({
				url: `/demand/${id}`,
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
