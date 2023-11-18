import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
	_category?: string;
};

const collectionApi = createApi({
	reducerPath: "collection",
	tagTypes: ["CollectionTag"],
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProducItemToBrandAndCategory: build.query({
			query: (query: TQuery) => `/collection/products?${objectToUrlParams(query)}`,
			providesTags: ["CollectionTag"],
		}),
		getFilterBrandAndCategory: build.query({
			query: (query: { _slug: string }) => `/collection?${objectToUrlParams(query)}`,
			providesTags: ["CollectionTag"],
		}),
	}),
});

export const { useGetFilterBrandAndCategoryQuery, useGetProducItemToBrandAndCategoryQuery } = collectionApi;

export default collectionApi;
