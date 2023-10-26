import { AxiosResponse } from "axios";
import * as http from "~/utils/http";

export const uploadImage = async (file?: any): Promise<AxiosResponse> => {
	const response = await http.postTypeRequest("/image", file, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response?.data;
};

export const removeFile = async (filename: any) => {
	const response = await http.deleteTypeRequest(`/image?filename=${filename}`);
	return response?.data;
};
