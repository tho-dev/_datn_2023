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
		getAllStatusProject: builder.query({
			query: () => ({
				url: `/ProjectStatus/List`,
				method: "GET",
			}),
			providesTags: ["ProductVariantTag"],
		}),
		getAllProjectHidden: builder.query({
			query: (query: TQuery) => `/Project/Hidden?${objectToUrlParams(query)}`,
			providesTags: ["ProductTag"],
		}),
		getAllProject: builder.query({
			query: (query: TQuery) => `/Project/List?${objectToUrlParams(query)}`,
			providesTags: ["ProductTag"],
		}),
		getProjectById: builder.query({
			query: (idProject: string) => ({
				url: `/Project/${idProject}`,
				method: "GET",
			}),
			providesTags: ["ProductSingleTag", "ProductTag"],
		}),
		getStorageById: builder.query({
			query: (id: string) => ({
				url: `/StorageOrgan/${id}`,
				method: "GET",
			}),
			providesTags: ["ProductSingleTag", "ProductTag"],
		}),
		getStorageByIdProject: builder.query({
			query: (idProject: any) => ({
				url: `/StorageOrgan/ByProject/${idProject}`,
				method: "GET",
			}),
			providesTags: ["VariantSingleTag", "ProductTag"],
		}),
		createProject: builder.mutation({
			query: (body) => ({
				url: "/Project/Add",
				method: "POST",
				body,
			}),
			invalidatesTags: ["ProductTag"],
		}),
		createStorage: builder.mutation({
			query: (body) => ({
				url: "/StorageOrgan/Add",
				method: "POST",
				body,
			}),
			invalidatesTags: ["ProductTag", "VariantSingleTag"],
		}),
		updateProject: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `/Project/${id}`,
				method: "PUT",
				body: body,
			}),
			invalidatesTags: ["ProductSingleTag", "ProductTag"],
		}),
		updateStatusProject: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/Project/${id}/UpdateStatus`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["ProductVariantTag", "VariantSingleTag", "ProductTag"],
		}),
		unHideProject: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/Project/${id}/Unhide`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["ProductVariantTag", "VariantSingleTag", "ProductTag"],
		}),
		deleteProject: builder.mutation<any, number>({
			query: (id) => ({
				url: `/Project/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["ProductTag"],
		}),
		deleteStorage: builder.mutation<any, number>({
			query: (id) => ({
				url: `/StorageOrgan/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["ProductTag"],
		}),
		updateStorage: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/StorageOrgan/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["VariantSingleTag", "ProductSingleTag"],
		}),
	}),
});

export const {
	useGetBySlugQuery,
	useGetAllProjectQuery,
	useCreateProjectMutation,
	useUpdateStorageMutation,
	useGetProjectByIdQuery,
	useGetAllStatusProjectQuery,
	useDeleteProjectMutation,
	useUpdateProjectMutation,
	useGetStorageByIdProjectQuery,
	useUpdateStatusProjectMutation,
	useCompareProductMutation,
	useGetSearchQuery,
	useCreateStorageMutation,
	useGetStorageByIdQuery,
	useDeleteStorageMutation,
	useGetAllProjectHiddenQuery,
	useUnHideProjectMutation
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
