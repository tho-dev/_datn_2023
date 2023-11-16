import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
	_keyword?: string;
};

const productApi = createApi({
	reducerPath: "product",
	tagTypes: ["ProductTag", "ProductSingleTag", "ProductVariantTag", "VariantSingleTag"],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.VITE_API_URL + "/product",
		// xét token vào headers
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).persistedReducer.global.accessToken;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getSearch: builder.query({
			query: (query: TQuery) => `/?${objectToUrlParams(query)}`,
		}),
		getBySlug: builder.query<any, string>({
			query: (slug) => ({
				url: `/${slug}`,
				method: "GET",
			}),
			providesTags: (result, error, slug) => [{ type: "ProductTag", slug }],
		}),
		compareProduct: builder.mutation({
			query: (body) => ({
				url: "/compare",
				method: "POST",
				body,
			}),
		}),
		getAllVariant: builder.query({
			query: ({ id }: { id: string }) => ({
				url: `/${id}/variants`,
				method: "GET",
			}),
			providesTags: ["ProductVariantTag"],
		}),
		getAllProduct: builder.query({
			query: (query: TQuery) => `/manager?${objectToUrlParams(query)}`,
		}),
		getProductById: builder.query({
			query: ({ id }: { id: string }) => ({
				url: `/manager/${id}`,
				method: "GET",
			}),
			providesTags: ["ProductSingleTag"],
		}),
		getSku: builder.query({
			query: ({ product_id, sku_id }: any) => ({
				url: `/${product_id}/variants/${sku_id}`,
				method: "GET",
			}),
			providesTags: ["VariantSingleTag"],
		}),
		createProduct: builder.mutation({
			query: (body) => ({
				url: "",
				method: "POST",
				body,
			}),
		}),
		updateProduct: builder.mutation({
			query: ({ _id, ...body }) => ({
				url: `/${_id}`,
				method: "PUT",
				body: body,
			}),
			invalidatesTags: ["ProductSingleTag"],
		}),
		updateVariant: builder.mutation({
			query: ({ _id, product_id, ...body }) => ({
				url: `/${product_id}/variants/${_id}`,
				method: "PUT",
				body: {
					...body,
					product_id: product_id,
				},
			}),
			invalidatesTags: ["ProductVariantTag", "VariantSingleTag"],
		}),
		deleteOptionProduct: builder.mutation<any, number>({
			query: ({ product_id, option_id }: any) => ({
				url: `/${product_id}/options/${option_id}`,
				method: "DELETE",
			}),
		}),
		saveVariants: builder.mutation({
			query: ({ product_id }) => ({
				url: `/${product_id}/variants`,
				method: "POST",
				body: {},
			}),
			invalidatesTags: ["ProductVariantTag"],
		}),
	}),
});

export const {
	useGetBySlugQuery,
	useGetAllProductQuery,
	useCreateProductMutation,
	useSaveVariantsMutation,
	useGetProductByIdQuery,
	useGetAllVariantQuery,
	useDeleteOptionProductMutation,
	useUpdateProductMutation,
	useGetSkuQuery,
	useUpdateVariantMutation,
	useCompareProductMutation,
	useGetSearchQuery,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
