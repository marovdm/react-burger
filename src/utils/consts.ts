export const NORMA_API = 'https://norma.nomoreparties.space/api';

export const AUTH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/token',
  FORGOT_PASSWORD: '/password-reset',
  RESET_PASSWORD: '/password-reset/reset'
}

export const USER = {
  PROFILE: '/auth/user'
}

export const BURGER = {
  FETCH_DATA: '/ingredients/',
}

export const ORDER = {
  BASE_URL_ORDER: '/orders',
}

export const URLS = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  PROFILE_ORDERS_ID: '/profile/orders/:id',
  FORGOT_PASSWORD: '/forgot-password',
  INGREDIENTS_ID: '/ingredients/:id',
  FEED: '/feed',
  FEED_DETAIL: '/feed/:id',
}

export const WS = {
  WS_USER_ORDERS: 'wss://norma.nomoreparties.space/orders',
  WS_ALL_ORDERS: 'wss://norma.nomoreparties.space/orders/all',
}