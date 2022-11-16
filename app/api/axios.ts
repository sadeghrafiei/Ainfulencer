import {AxiosRequestConfig, AxiosResponse} from 'axios';
import axiosClient from './ApiConfig';

export interface ApiResponse<Items = unknown> {
  status: 'failed' | 'succeed';
  message: string;
  items: Items;
}

export interface CustomAxiosConfig extends AxiosRequestConfig {
  clientToApiKeyMap?: Record<string, string>;
}

export async function get<T extends ApiResponse>(
  url: string,
  config?: CustomAxiosConfig,
): Promise<AxiosResponse<T>> {
  return axiosClient.get<T>(url, config);
}
