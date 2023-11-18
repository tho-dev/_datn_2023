import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
};

const promotionApi = createApi({
	reducerPath: "promotion",
	baseQuery: baseQuery,
	tagTypes: ["PromotionTag", "PromotionSingleTag"],
	endpoints: (build) => ({
		getAllPromotion: build.query({
			query: (query: TQuery) => `/promotions?${objectToUrlParams(query)}`,
			providesTags: ["PromotionTag"],
		}),
		getSinglePromotion: build.query({
			query: ({ slug }) => `/promotions/detail?slug=${slug}`,
			providesTags: ["PromotionSingleTag"],
			transformResponse: (res: any) => res?.data,
		}),
		createPromotion: build.mutation({
			query: (body) => ({
				url: `/promotions`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["PromotionTag"],
		}),
		updatePromotion: build.mutation<any, { _id: number }>({
			query: ({ _id, ...patch }) => ({
				url: `/promotions/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["PromotionTag", "PromotionSingleTag"],
		}),
		deletePromotion: build.mutation({
			query: (id) => ({
				url: `/promotions/${id}`,
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
