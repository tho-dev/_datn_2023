import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

export const getTypeRequest = async (path: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
	const response = await http.get(path, options);
	return response;
};

export const postTypeRequest = async (
	path: string,
	data = {},
	options: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
	const response = await http.post(path, data, options);
	return response;
};

export const putTypeRequest = async (
	path: string,
	data = {},
	options: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
	const response = await http.put(path, data, options);
	return response;
};

export const deleteTypeRequest = async (path: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
	const response = await http.delete(path, options);
	return response;
};

export const patchTypeRequest = async (path: string, data = {}, options = {}): Promise<AxiosResponse> => {
	const response = await http.patch(path, data, options);
	return response;
};
