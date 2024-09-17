import axios, { type InternalAxiosRequestConfig, type AxiosError } from 'axios';

const baseUrl = 'http://localhost:3000/api';

const bodegaApi = axios.create({
  baseURL: baseUrl,
});

bodegaApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || new axios.AxiosHeaders();
  config.headers.set('x-token', localStorage.getItem('token') || '' );
  return config;
},
(error: AxiosError) => {
  return Promise.reject(error);
});

export default bodegaApi;