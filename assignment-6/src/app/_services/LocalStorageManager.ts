const TOKEN_KEY = process.env.TOKEN_KEY || 'token';
const USER_KEY = process.env.USER_KEY || 'user';

const LocalStorageManager = () => {
  const cleanSession = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const saveUser = (user: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, user);
  };

  const getUser = () => {
    if (typeof window === 'undefined') return undefined;
    return localStorage.getItem(USER_KEY);
  };

  const saveToken = (accessToken: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, accessToken);
  };
  const getToken = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(TOKEN_KEY);
  };

  const checkLogin = () => {
    if (typeof window === 'undefined') return false;
    return Boolean(localStorage.getItem(TOKEN_KEY));
  };

  return { cleanSession, saveUser, getUser, saveToken, getToken, checkLogin };
};

export default LocalStorageManager;
