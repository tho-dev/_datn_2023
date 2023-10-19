
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "~/utils/fc";

type TQuery = {
    _order?: string;
    _sort?: string;
    _page?: number;
    _limit?: number;
    _category?: string;
};

const collectionApi = createApi({
    reducerPath: 'collection',
    tagTypes: ['CollectionTag'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_API_URL + "/collection",
    }),

    endpoints: (build) => ({
        getProducItemToBrandAndCategory: build.query({
            query: (query: TQuery) => `products?${objectToUrlParams(query)}`,
            providesTags: ["CollectionTag"],
        }),
        getFilterBrandAndCategory: build.query({
            query: (query: { _slug: string }) => `?${objectToUrlParams(query)}`,
            providesTags: ["CollectionTag"],
        }),
    }),
});

export const {
    useGetFilterBrandAndCategoryQuery,
    useGetProducItemToBrandAndCategoryQuery,
} = collectionApi

export default collectionApi