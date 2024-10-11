import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, objectToUrlParams } from "~/utils/fc";


const categoryApi = createApi({
	reducerPath: "category",
	baseQuery: baseQuery,
	tagTypes: ["CategoryTag"],
	endpoints: (build) => ({
		getAllDocument: build.query({
			query: (query: any) => `/Document/List?${objectToUrlParams(query)}`,
			providesTags: ["CategoryTag"],
		}),
		getAllPdfFormatList: build.query({
			query: (query: any) => `/PdfFormat/List?${objectToUrlParams(query)}`,
		}),
		getAllScanModeList: build.query({
			query: (query: any) => `/ScanMode/List?${objectToUrlParams(query)}`,
		}),
		getDocumentByProject: build.query({
			query: (id) => `/Document/ByProject/${id}`,
		}),
		getDocumentById: build.query({
			query: (id) => `/Document/${id}`,
		}),
		getDocumentByStorage: build.query({
			query: (id) => `/Document/ByStorage/${id}`,
		}),
		createCategory: build.mutation({
			query: (body) => ({
				url: `/category`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		createDocument: build.mutation({
			query: (formData) => ({
				url: `/Document/Add`,
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		updateDocument: build.mutation({
			query: ({ id, data }) => ({
				url: `/Document/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		updateCategory: build.mutation({
			query: ({ _id, ...patch }) => ({
				url: `/category/${_id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["CategoryTag"],
		}),
		deleteCategory: build.mutation({
			query(id) {
				return {
					url: `/category/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["CategoryTag"],
		}),
		deleteDocument: build.mutation({
			query(id) {
				return {
					url: `/Document/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["CategoryTag"],
		}),
	}),
});

export const {
	useGetAllDocumentQuery,
	useGetDocumentByStorageQuery,
	useGetDocumentByProjectQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useGetAllPdfFormatListQuery,
	useGetAllScanModeListQuery,
	useCreateDocumentMutation,
	useDeleteDocumentMutation,
	useGetDocumentByIdQuery,
	useUpdateDocumentMutation
} = categoryApi;

export default categoryApi;
