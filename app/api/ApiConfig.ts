import axios from 'axios';
import {getToken} from '../helpers/localStorage';
import {CustomAxiosConfig} from './axios';

const axiosClient = axios.create({
  timeout: 8000,
  baseURL: 'https://jsonplaceholder.typicode.com/',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (request: CustomAxiosConfig) => {
  const token = await getToken();

  if (token) {
    request.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  const {clientToApiKeyMap, data, method, params} = request;

  if (clientToApiKeyMap) {
    let clientData: Record<string, unknown> = {};
    let isGetMethod = false;

    if (method && method.toLowerCase() === 'get') {
      clientData = params;
      isGetMethod = true;
    } else if (
      method &&
      ['put', 'post', 'delete', 'patch'].includes(method.toLowerCase()) &&
      data
    ) {
      clientData = data;
    }

    const apiCompatibleData: Record<string, unknown> = {};
    Object.keys(clientData).forEach(clientKey => {
      const apiKey = clientToApiKeyMap[clientKey];
      if (apiKey) {
        apiCompatibleData[apiKey] = clientData[clientKey];
      } else {
        apiCompatibleData[clientKey] = clientData[clientKey];
      }
    });

    if (isGetMethod) {
      request.params = apiCompatibleData;
    } else {
      request.data = apiCompatibleData;
    }
  }

  return request;
});

export default axiosClient;
