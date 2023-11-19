import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
};

const couponApi = createApi({
	reducerPath: "coupon",
	baseQuery: baseQuery,
	tagTypes: ["CouponTag", "CouponSingleTag"],
	endpoints: (build) => ({
		getAllCoupon: build.query({
			query: (query: TQuery) => `/coupon?${objectToUrlParams(query)}`,
			providesTags: ["CouponTag"],
		}),
		getSingleCoupon: build.query({
			query: ({ id }) => `/coupon/${id}`,
			providesTags: ["CouponTag"],
			transformResponse: (res: any) => res?.data,
		}),
		getValueCoupon: build.mutation({
			query: (data) => ({
				url: `/coupon/coupon_value`,
				method: "POST",
				body: data
			}),
		}),
		createCoupon: build.mutation({
			query: (body) => ({
				url: `/coupon`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["CouponSingleTag", "CouponTag"],
		}),
		updateCoupon: build.mutation<any, { _id: number }>({
			query: ({ _id, ...patch }) => ({
				url: `/coupon/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["CouponTag", "CouponSingleTag"],
		}),
		deleteCounpon: build.mutation({
			query: (id) => ({
				url: `/coupon/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["CouponTag"],
		}),
	}),
});

export const {
	useGetAllCouponQuery,
	useGetSingleCouponQuery,
	useCreateCouponMutation,
	useDeleteCounponMutation,
	useUpdateCouponMutation,
	useGetValueCouponMutation
} = couponApi;

export default couponApi;
