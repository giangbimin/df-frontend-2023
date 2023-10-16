'use client';

import { redirect } from 'next/navigation';
import useSWR from 'swr';
import { ReactNode, useEffect } from 'react';
import Loading from '../loading';
import { Profile } from '../_types';
import { SessionProvider } from '../_contexts/SessionContext';
import { fetchWrapper } from '../_services/common/fetchWrapper';
import Layout from '../_components/Layout';

export default function SecureLayout({ children }: { children: ReactNode }) {
  const fetcher = (url: string) => fetchWrapper(url, 'GET');
  const { data, isLoading } = useSWR(
    'https://develop-api.bookstore.dwarvesf.com/api/v1/me',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  useEffect(() => {
    if (!isLoading && data?.status === 401) redirect('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data || isLoading) return <Loading text="BookStore" />;
  const currentUser = data.success ? (data.data as Profile) : undefined;
  return (
    <SessionProvider initialCurrentUser={currentUser}>
      <Layout> {children} </Layout>
    </SessionProvider>
  );
}
