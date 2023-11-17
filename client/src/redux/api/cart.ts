import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "~/utils/fc";

const cartApi = createApi({
	reducerPath: "cart",
	tagTypes: ["Cart", "Auth"],
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		addToCart: builder.mutation<any, any>({
			query: (data) => ({
				url: `/cart`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),
		byNow: builder.mutation<any, any>({
			query: (data) => ({
				url: `/cart`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),
		createCart: builder.mutation<any, any>({
			query: (data) => ({
				url: `/cart/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),
		increment: builder.mutation<any, any>({
			query: (data) => ({
				url: `/cart/deleteOne/${data.sku_id}`,
				method: "DELETE",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),
		decrement: builder.mutation<any, any>({
			query: (data) => ({
				url: `/cart/addOne/${data.sku_id}`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),

		getCart: builder.query<any, string>({
			query: (cart_id) => ({
				url: `/cart/${cart_id}`,
				method: "GET",
			}),
			providesTags: ["Cart"],
		}),
		getCartByUserId: builder.mutation<any, any>({
			query: (user_id) => ({
				url: `/cart/user/${user_id}`,
				method: "POST",
			}),
			invalidatesTags: ["Cart"],
		}),
		remove: builder.mutation<any, any>({
			query: (data) => ({
				url: `/cart/${data.sku_id}`,
				method: "DELETE",
				body: data,
			}),
			invalidatesTags: ["Cart"],
		}),
		deleteCart: builder.mutation<any, any>({
			query: (id) => ({
				url: `/cart/delete/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Cart"],
		}),
	}),
});
export const {
	useAddToCartMutation,
	useGetCartQuery,
	useDecrementMutation,
	useIncrementMutation,
	useRemoveMutation,
	useGetCartByUserIdMutation,
	useCreateCartMutation,
	useDeleteCartMutation,
	useByNowMutation,
} = cartApi;

export const productReducer = cartApi.reducer;

export default cartApi;
