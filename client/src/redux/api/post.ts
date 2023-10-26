import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "~/interface/post";
import { objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
	_type: string;
};

const postApi = createApi({
	reducerPath: "post",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.VITE_API_URL + "/post",
	}),
	tagTypes: ["PostTag"],
	endpoints: (build) => ({
		getAllPost: build.query({
			query: (query: TQuery) => `?${objectToUrlParams(query)}`,
			providesTags: ["PostTag"],
		}),
		getSinglePost: build.query({
			query: (id) => `/${id}`,
		}),
		createPost: build.mutation<any, IPost>({
			query: (body) => ({
				url: ``,
				method: "POST",
				body,
			}),
			invalidatesTags: ["PostTag"],
		}),
		updatePost: build.mutation<any, { _id: number }>({
			query: ({ _id, ...patch }) => ({
				url: `/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["PostTag"],
		}),
		deletePost: build.mutation<any, number>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["PostTag"],
		}),
	}),
});

export const {
	useGetAllPostQuery,
	useGetSinglePostQuery,
	useCreatePostMutation,
	useDeletePostMutation,
	useUpdatePostMutation,
} = postApi;

export default postApi;
