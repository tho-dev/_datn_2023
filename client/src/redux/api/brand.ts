import { createApi } from "@reduxjs/toolkit/query/react";
import { IBrand } from "~/interface/brand";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
	_category?: string;
};

const brandApi = createApi({
	reducerPath: "brand",
	baseQuery: baseQuery,
	tagTypes: ["BrandTag"],
	endpoints: (build) => ({
		getAllBrands: build.query({
			query: (query: TQuery) => `/brand?${objectToUrlParams(query)}`,
			providesTags: ["BrandTag"],
		}),
		getSingleBrand: build.query({
			query: (id) => ({
				url: `/brand/${id}`,
				method: "GET",
			}),
		}),
		createBrand: build.mutation<IBrand, IBrand>({
			query: (body) => ({
				url: `/brand`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["BrandTag"],
		}),

		updateBrand: build.mutation({
			query: ({ _id, ...patch }) => ({
				url: `/brand/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["BrandTag"],
		}),

		deleteBrand: build.mutation<IBrand, IBrand>({
			query: (id) => ({
				url: `/brand/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["BrandTag"],
		}),
	}),
});

export const {
	useGetAllBrandsQuery,
	useGetSingleBrandQuery,
	useCreateBrandMutation,
	useDeleteBrandMutation,
	useUpdateBrandMutation,
} = brandApi;

export default brandApi;
