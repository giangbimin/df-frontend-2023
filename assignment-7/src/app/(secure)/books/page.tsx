'use client';

import { useSearchParams } from 'next/navigation';
import { GetBooksParams, useGetBooks, Metadata } from 'api';
import BookList from '../../_components/page/BookList';
import Loading from '../../loading';
import BookTableHeader from '../../_components/BookTableHeader';
import BookTableFooter from '../../_components/BookTableFooter';

export default function BooksPage() {
  const searchParams = useSearchParams();

  const getStoredQuery = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('query') || '';
  };

  const parsedPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
  const parsedPageSize =
    parseInt(searchParams?.get('pageSize') ?? '5', 10) || 5;
  const parsedQuery = searchParams?.get('query') || getStoredQuery();
  const searchCondition: GetBooksParams = {
    page: parsedPage,
    query: parsedQuery,
    pageSize: parsedPageSize,
  };
  const defaultMetadata: Metadata = {
    page: 1,
    pageSize: parsedPageSize,
    totalPages: 1,
    totalRecords: 0,
  };
  const { data, isLoading } = useGetBooks(searchCondition, {
    swr: { swrKey: `/books?page=${searchCondition.page}`, enabled: true },
  });
  const books = data?.data || [];
  const metadata = data?.metadata || defaultMetadata;

  return (
    <div id="books">
      <BookTableHeader searchCondition={searchCondition} />
      {isLoading ? (
        <Loading text="Books" />
      ) : (
        <>
          <BookList books={books} />
          <BookTableFooter metadata={metadata} />
        </>
      )}
    </div>
  );
}
