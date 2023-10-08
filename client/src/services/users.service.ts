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
export const resetPassword = async (data: any): Promise<AxiosResponse> => {
  console.log(data);
  const response = await http.postTypeRequest(`user/resetPassword`, data);
  console.log(response);
  return response?.data;
};
export const sendOtpResetPassword = async (data: any): Promise<AxiosResponse> => {
  const response = await http.postTypeRequest(`user/sent-otp`, data);
  return response?.data;
};
