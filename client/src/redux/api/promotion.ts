import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
};

const promotionApi = createApi({
	reducerPath: "promotion",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.VITE_API_URL + "/promotions",
	}),
	tagTypes: ["PromotionTag", "PromotionSingleTag"],
	endpoints: (build) => ({
		getAllPromotion: build.query({
			query: (query: TQuery) => `?${objectToUrlParams(query)}`,
			providesTags: ["PromotionTag"],
		}),
		getSinglePromotion: build.query({
			query: ({ slug }) => `/detail?slug=${slug}`,
			providesTags: ["PromotionSingleTag"],
			transformResponse: (res: any) => res?.data,
		}),
		createPromotion: build.mutation({
			query: (body) => ({
				url: ``,
				method: "POST",
				body,
			}),
			invalidatesTags: ["PromotionTag"],
		}),
		updatePromotion: build.mutation<any, { _id: number }>({
			query: ({ _id, ...patch }) => ({
				url: `/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["PromotionTag", "PromotionSingleTag"],
		}),
		deletePromotion: build.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["PromotionTag"],
		}),
	}),
});

export const {
	useGetAllPromotionQuery,
	useGetSinglePromotionQuery,
	useCreatePromotionMutation,
	useUpdatePromotionMutation,
	useDeletePromotionMutation,
} = promotionApi;

export default promotionApi;
