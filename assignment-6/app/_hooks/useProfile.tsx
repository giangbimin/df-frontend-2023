import useSWR from 'swr';
import { fetchWrapper } from '../_services/common/fetchWrapper';

export default function useProfile() {
  const fetcher = (url: string) => fetchWrapper(url, 'GET');
  const { data, error, isLoading, mutate } = useSWR('/me', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
