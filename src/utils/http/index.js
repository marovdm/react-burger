import axios from 'axios';

import { AUTH, BURGER, NORMA_API } from '../consts';

// URL NOT REQUIRED TOKEN IN HEADERS 
const skipAuth = [
  AUTH.REGISTER, 
  AUTH.FORGOT_PASSWORD,
  AUTH.RESET_PASSWORD,
  AUTH.REFRESH,
  BURGER.FETCH_DATA, 
  BURGER.CREATE_ORDER
];

const $api = axios.create({ 
  baseURL: NORMA_API
});

$api.interceptors.request.use(config => {
  if (config.url && skipAuth.includes(config.url)) return config;

  const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;

  config.headers = { 
    withCredentials: true,
    Authorization: accessToken
  };
  
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
  const originRequest = error.config;
  console.log('error', error);
  if (error.response.status === 403 && 
    error.response.data.message === 'jwt expired' && 
    !error.response.data.success && 
    !error?.config.isRetry) {
    originRequest.isRetry = true;
    try {
      // здесь нужен REFRESH TOKEN!!!!
      // const refresh = localStorage.getItem('refreshToken');
      const response = await $api.post(AUTH.REFRESH, {withCredentials: true});
      console.log(response);
      
      return $api.request(originRequest);
    } catch (e) {
      console.log(e)
    }
  } 
  throw error;
})

export default $api;