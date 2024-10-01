import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

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
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getSearch: builder.query({
			query: (query: TQuery) => `/product?${objectToUrlParams(query)}`,
		}),
		getBySlug: builder.query<any, string>({
			query: (slug) => ({
				url: `/product/${slug}`,
				method: "GET",
			}),
			providesTags: (result, error, slug) => [{ type: "ProductTag", slug }],
		}),
		compareProduct: builder.mutation({
			query: (body) => ({
				url: "/product/compare",
				method: "POST",
				body,
			}),
		}),
		getAllVariant: builder.query({
			query: ({ id }: { id: string }) => ({
				url: `/product/${id}/variants`,
				method: "GET",
			}),
			providesTags: ["ProductVariantTag"],
		}),
		getAllProductManager: builder.query({
			query: (query: TQuery) => `/product?${objectToUrlParams(query)}`,
		}),
		getAllProject: builder.query({
			query: (query: TQuery) => `/Project/List?${objectToUrlParams(query)}`,
			providesTags: ["ProductTag"],
		}),
		getProductById: builder.query({
			query: ({ id }: { id: string }) => ({
				url: `/product/manager/${id}`,
				method: "GET",
			}),
			providesTags: ["ProductSingleTag"],
		}),
		getSku: builder.query({
			query: ({ product_id, sku_id }: any) => ({
				url: `/product/${product_id}/variants/${sku_id}`,
				method: "GET",
			}),
			providesTags: ["VariantSingleTag"],
		}),
		createProject: builder.mutation({
			query: (body) => ({
				url: "/Project/Add",
				method: "POST",
				body,
			}),
			invalidatesTags: ["ProductTag"],
		}),
		updateProduct: builder.mutation({
			query: ({ _id, ...body }) => ({
				url: `/product/${_id}`,
				method: "PUT",
				body: body,
			}),
			invalidatesTags: ["ProductSingleTag"],
		}),
		updateVariant: builder.mutation({
			query: ({ _id, product_id, ...body }) => ({
				url: `/product/${product_id}/variants/${_id}`,
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
				url: `/product/${product_id}/options/${option_id}`,
				method: "DELETE",
			}),
		}),
		saveVariants: builder.mutation({
			query: ({ product_id }) => ({
				url: `/product/${product_id}/variants`,
				method: "POST",
				body: {},
			}),
			invalidatesTags: ["ProductVariantTag"],
		}),
	}),
});

export const {
	useGetBySlugQuery,
	useGetAllProjectQuery,
	useCreateProjectMutation,
	useSaveVariantsMutation,
	useGetProductByIdQuery,
	useGetAllVariantQuery,
	useDeleteOptionProductMutation,
	useUpdateProductMutation,
	useGetSkuQuery,
	useUpdateVariantMutation,
	useCompareProductMutation,
	useGetSearchQuery,
	useGetAllProductManagerQuery,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
