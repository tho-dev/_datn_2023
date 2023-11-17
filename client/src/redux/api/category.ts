import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
	_type?: string;
};

const categoryApi = createApi({
	reducerPath: "category",
	baseQuery: baseQuery,
	tagTypes: ["CategoryTag"],
	endpoints: (build) => ({
		getAllCategory: build.query({
			query: (query: TQuery) => `/category?${objectToUrlParams(query)}`,
			providesTags: ["CategoryTag"],
		}),
		getSingleCategory: build.query({
			query: (id) => `/category/${id}`,
		}),
		createCategory: build.mutation({
			query: (body) => ({
				url: `/category`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		updateCategory: build.mutation({
			query: ({ _id, ...patch }) => ({
				url: `/category/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		deleteCategory: build.mutation({
			query(id) {
				return {
					url: `/category/${id}`,
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
