import axios from 'axios';
import Auth from '../api/auth';

import { AUTH, BURGER, NORMA_API } from '../consts';

// Эндпоинты, не требующие токена в хедере
const skipAuth = [
  AUTH.REGISTER, 
  AUTH.FORGOT_PASSWORD,
  AUTH.RESET_PASSWORD,
  AUTH.REFRESH,
  BURGER.FETCH_DATA
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
  // Обновление токена если пришел ответ с сервера что он истек
  if (error.response.status === 403 && 
    error.response.data.message === 'jwt expired' && 
    !error.response.data.success && 
    !error?.config.isRetry) {
    originRequest.isRetry = true;
    try {
      const token = localStorage.getItem('refreshToken');
      const response = await $api.post(AUTH.REFRESH, {token});
     
      if (response.data.success) {
        Auth.setTokensCredentials(response.data)
      }
      
      return $api.request(originRequest);
    } catch (e) {
      console.log(e)
    }
  } 
  throw error;
})

export default $api;