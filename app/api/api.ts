import {AxiosResponse} from 'axios';
import {ApiResponse, get} from './axios';

export const users = (): Promise<AxiosResponse<ApiResponse>> => {
  return get<ApiResponse>('users');
};
