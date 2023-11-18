import { createApi } from "@reduxjs/toolkit/query/react";
import { IPost } from "~/interface/post";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
	_type: string;
};

const postApi = createApi({
	reducerPath: "post",
	baseQuery: baseQuery,
	tagTypes: ["PostTag"],
	endpoints: (build) => ({
		getAllPost: build.query({
			query: (query: TQuery) => `/post?${objectToUrlParams(query)}`,
			providesTags: ["PostTag"],
		}),
		getSinglePost: build.query<any, string>({
			query: (slug) => ({
				url: `/post/${slug}`,
				method: "GET",
			}),
			providesTags: (result, error, slug) => [{ type: "PostTag", slug }],
		}),
		createPost: build.mutation<any, IPost>({
			query: (body) => ({
				url: `/post`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["PostTag"],
		}),
		updatePost: build.mutation<any, { _id: number }>({
			query: ({ _id, ...patch }) => ({
				url: `/post/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["PostTag"],
		}),
		deletePost: build.mutation<any, number>({
			query: (id) => ({
				url: `/post/${id}`,
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
