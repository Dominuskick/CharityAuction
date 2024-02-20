import { API_BASE_URL } from '@/utils/constants/backend';
import axios from 'axios';

const $host = axios.create({
  baseURL: API_BASE_URL,
});

const $authHost = axios.create({
  baseURL: API_BASE_URL,
});

const authInterception = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterception);

export { $host, $authHost };
