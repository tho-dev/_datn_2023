import axios from "axios";

const BASE_URL = "";

export const getProvinces = async (query: string) => {
	const response = await axios.get(BASE_URL + query);
	return response?.data;
};
