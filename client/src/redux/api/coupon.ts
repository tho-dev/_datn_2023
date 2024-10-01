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
		getAllAcc: build.query({
			query: (query: TQuery) => `Acc/List?${objectToUrlParams(query)}`,
			providesTags: ["CouponTag"],
		}),
		getSingleAcc: build.query({
			query: ({ id }) => `Acc/${id}/Info`,
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
		resetPassword: build.mutation({
			query: (body) => ({
				url: `/Acc/ResetPwd`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["CouponSingleTag", "CouponTag"],
		}),
		updateAcc: build.mutation<any, { id: number }>({
			query: ({ id, ...patch }) => ({
				url: `/Acc/${id}/Edit`,
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
	useGetAllAccQuery,
	useGetSingleAccQuery,
	useResetPasswordMutation,
	useDeleteCounponMutation,
	useUpdateAccMutation,
	useGetValueCouponMutation
} = couponApi;

export default couponApi;
