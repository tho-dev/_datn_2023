import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { objectToUrlParams } from "~/utils/fc";

type TQuery = {
	_order?: string;
	_sort?: string;
	_page?: number;
	_limit?: number;
};

const productApi = createApi({
	reducerPath: "product",
	tagTypes: ["ProductTag"],
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
		getBySlug: builder.query<any, string>({
			query: (slug) => ({
				url: `/${slug}`,
				method: "GET",
			}),
			providesTags: (result, error, slug) => [{ type: "ProductTag", slug }],
		}),
		getAllProduct: builder.query({
			query: (query: TQuery) => `/manager?${objectToUrlParams(query)}`,
		}),
	}),
});

export const { useGetBySlugQuery, useGetAllProductQuery } = productApi;
export const productReducer = productApi.reducer;
export default productApi;
