import { Me } from 'api';

const TOKEN_KEY = process.env.TOKEN_KEY || 'token';
const USER_KEY = process.env.USER_KEY || 'user';

export const cleanSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveUser = (user: Me) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window === 'undefined') return undefined;
  return localStorage.getItem(USER_KEY);
};

export const saveToken = (accessToken: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, accessToken);
};
export const getToken = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(TOKEN_KEY);
};

export const checkLogin = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem(TOKEN_KEY));
};
