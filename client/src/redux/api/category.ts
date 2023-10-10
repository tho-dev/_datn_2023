import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_parent?: boolean;
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
	_type?: string;
};

const categoryApi = createApi({
	reducerPath: "category",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.VITE_API_URL + "/category" }),
	tagTypes: ["CategoryTag"],
	endpoints: (build) => ({
		getAllCategory: build.query({
			query: (query: TQuery) => `?${objectToUrlParams(query)}`,
			providesTags: ["CategoryTag"],
		}),
		getSingleCategory: build.query({
			query: (id) => `/${id}`,
		}),
		createCategory: build.mutation({
			query: (body) => ({
				url: ``,
				method: "POST",
				body,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		updateCategory: build.mutation({
			query: ({ _id, ...patch }) => ({
				url: `/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		deleteCategory: build.mutation({
			query(id) {
				return {
					url: `/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["CategoryTag"],
		}),
	}),
});

export const {
	useGetAllCategoryQuery,
	useGetSingleCategoryQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
