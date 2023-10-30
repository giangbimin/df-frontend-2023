/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useSwr from 'swr';
import type { Key, SWRConfiguration } from 'swr';
import type { ErrorResponse, TopicsResponse } from '../model';

/**
 * Get all topics
 * @summary Get all topics
 */
export const getTopics = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<TopicsResponse>> => {
  return axios.get(`/topics`, options);
};

export const getGetTopicsKey = () => [`/topics`] as const;

export type GetTopicsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTopics>>
>;
export type GetTopicsQueryError = AxiosError<ErrorResponse>;

/**
 * @summary Get all topics
 */
export const useGetTopics = <TError = AxiosError<ErrorResponse>>(options?: {
  swr?: SWRConfiguration<Awaited<ReturnType<typeof getTopics>>, TError> & {
    swrKey?: Key;
    enabled?: boolean;
  };
  axios?: AxiosRequestConfig;
}) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false;
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getGetTopicsKey() : null));
  const swrFn = () => getTopics(axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};
