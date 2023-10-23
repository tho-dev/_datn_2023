import { AxiosResponse } from 'axios';
import * as http from '~/utils/http';

export const signUp = async (data: any): Promise<AxiosResponse> => {
  const response = await http.postTypeRequest('/user', data);
  return response?.data;
};

export const signIn = async (data: any): Promise<AxiosResponse> => {
  const response = await http.postTypeRequest('/user/login', data);
  return response?.data;
};
