// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { objectToUrlParams } from "~/utils/fc";

// type TQuery = {
// 	_order?: string;
// 	_sort?: string;
// 	_page?: number;
// 	_limit?: number;
// };

// const skuApi = createApi({
// 	reducerPath: "sku",
// 	baseQuery: fetchBaseQuery({ baseUrl: process.env.VITE_API_URL + "/sku" }),
// 	tagTypes: ["SkuTag"],
// 	endpoints: (build) => ({
// 		getAllProduct: build.query({
// 			query: (query: TQuery) => `?${objectToUrlParams(query)}`,
// 			providesTags: ["SkuTag"],
// 		}),
// 		getSingleProduct: build.query({
// 			query: (id) => `/${id}`,
// 		}),
// 		createProduct: build.mutation({
// 			query: (body) => ({
// 				url: ``,
// 				method: "POST",
// 				body,
// 			}),
// 			invalidatesTags: ["SkuTag"],
// 		}),
// 		updateProduct: build.mutation({
// 			query: ({ _id, ...patch }) => ({
// 				url: `/${_id}`,
// 				method: "PUT",
// 				body: patch,
// 			}),
// 			invalidatesTags: ["SkuTag"],
// 		}),
// 		deleteProduct: build.mutation({
// 			query(id) {
// 				return {
// 					url: `/${id}`,
// 					method: "DELETE",
// 				};
// 			},
// 			invalidatesTags: ["SkuTag"],
// 		}),
// 	}),
// });

// export const {
// 	useGetAllProductQuery,
// 	useGetSingleProductQuery,
// 	useCreateProductMutation,
// 	useDeleteProductMutation,
// 	useUpdateProductMutation,
// } = skuApi;

// export default skuApi;
