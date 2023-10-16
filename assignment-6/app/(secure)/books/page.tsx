'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import BookList from '../../_components/page/BookList';
import Loading from '../../loading';
import { Book, ListBookPayload, Metadata, defaultMetadata } from '../../_types';
import { fetchWrapper } from '../../_services/common/fetchWrapper';
import BookTableHeader from '../../_components/BookTableHeader';
import BookTableFooter from '../../_components/BookTableFooter';

export default function BooksPage() {
  const searchParams = useSearchParams();

  const parsedPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
  const parsedPageSize =
    parseInt(searchParams?.get('pageSize') ?? '5', 10) || 5;
  const parsedQuery = searchParams?.get('query') || '';
  const searchCondition: ListBookPayload = {
    page: parsedPage,
    query: parsedQuery,
    pageSize: parsedPageSize,
  };
  const queryParams = Object.keys(searchCondition)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          searchCondition[key],
        )}`,
    )
    .join('&');

  const reqKey = `https://develop-api.bookstore.dwarvesf.com/api/v1/books?${queryParams}`;

  const fetcher = (url: string) => fetchWrapper(url, 'GET');

  const { data, isLoading } = useSWR(reqKey, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  let books: Book[];
  let metadata: Metadata;
  if (data?.success) {
    books = data.data as Book[];
    metadata = data.metadata as Metadata;
  } else {
    books = [];
    metadata = defaultMetadata;
  }

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
