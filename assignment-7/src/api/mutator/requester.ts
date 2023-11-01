import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import LocalStorageManager from './LocalStorageManager';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL });

const localStorageManager = LocalStorageManager();

// Interceptors
const handleResponseSuccess = (response: AxiosResponse) => response;
const handleResponseFail = async (error: AxiosError) => {
  // 401 error code -> unauthorized
  if (error.response?.status === 401) localStorageManager.cleanSession();
  return Promise.reject(error);
};

export const requester = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  // Add token to request header
  const accessToken = localStorageManager.getToken();
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  };
  // Add interceptors
  AXIOS_INSTANCE.interceptors.response.use(
    handleResponseSuccess,
    handleResponseFail,
  );

  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by requester');
  };

  return promise;
};

export default requester;
