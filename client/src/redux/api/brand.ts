import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBrand } from "~/interface/brand";
import { objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
};

const brandApi = createApi({
	reducerPath: "brand",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.VITE_API_URL + "/brand",
	}),
	tagTypes: ["BrandTag"],

	endpoints: (build) => ({
		getAllBrands: build.query({
			query: (query: TQuery) => `?${objectToUrlParams(query)}`,
			providesTags: ["BrandTag"],
		}),
		getSingleBrand: build.query({
			query: (id) => ({
				url: `/${id}`,
				method: "GET",
			}),
		}),
		createBrand: build.mutation<IBrand, IBrand>({
			query: (body) => ({
				url: ``,
				method: "POST",
				body,
			}),
			invalidatesTags: ["BrandTag"],
		}),

		updateBrand: build.mutation({
			query: ({ _id, ...patch }) => ({
				url: `/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["BrandTag"],
		}),

		deleteBrand: build.mutation<IBrand, IBrand>({
			query: (id) => ({
				url: `/${id}`,
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
