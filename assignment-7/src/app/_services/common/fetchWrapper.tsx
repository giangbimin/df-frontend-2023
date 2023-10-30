import { clearCookie, getCookie } from '../utils/cookieUtils';
import { FetchResponse, Metadata } from '../../_types/api/request.d';

// const { publicRuntimeConfig } = getConfig();
// const { apiUrl } = publicRuntimeConfig;
// console.log(apiUrl);
const isApiUrl = (url: string) =>
  url.startsWith('https://develop-api.bookstore.dwarvesf.com/api/v1');

const authorizationBearer = () => {
  return getCookie('bearerToken');
};

const clearAuthorizationBearer = () => {
  clearCookie('bearerToken');
};

const authHeader = async (url: string): Promise<HeadersInit> => {
  const token = await authorizationBearer();
  if (token !== '' && isApiUrl(url)) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const requestOptions = (
  method: string,
  header: HeadersInit,
  body?: unknown,
) => {
  const requestOptions: RequestInit = {
    method,
    headers: header,
  };
  if (method === 'GET' || !body) return requestOptions;
  requestOptions.headers = {
    ...requestOptions.headers,
    'Content-Type': 'application/json',
  };
  requestOptions.body = JSON.stringify(body);
  return requestOptions;
};

const requestUrl = (url: string, method: string, body?: unknown) => {
  if (method !== 'GET' || !body) return url;
  const queryParams = Object.keys(body)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
    .join('&');

  if (url.includes('?')) return `${url}&${queryParams}`;
  return `${url}?${queryParams}`;
};

export async function fetchWrapper(
  url: string,
  method: string,
  body?: unknown,
): Promise<FetchResponse> {
  const header = await authHeader(url);
  try {
    const response = await fetch(
      requestUrl(url, method, body),
      requestOptions(method, header, body),
    );
    const responseData = await response.json();
    if (!response.ok) {
      if (response.status === 401) clearAuthorizationBearer();
      return {
        status: response.status,
        success: false,
        data: responseData,
      };
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result: FetchResponse = {
        status: response.status,
        success: true,
        data: responseData.data,
      };
      if (responseData.metadata) {
        result.metadata = responseData.metadata as Metadata;
      }
      return result;
    }
    return {
      status: response.status,
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      data: { error },
    };
  }
}
