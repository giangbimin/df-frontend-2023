'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { BookList } from './_components/BookList';
import Loading from './loading';
import { useBookService } from './_helpers/client/useBookService';

export default function HomePage() {
  const searchParams = useSearchParams();
  const bookStoreService = useBookService();
  const parsedPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
  const parsedTerm = searchParams?.get('term') || '';

  useEffect(() => {
    bookStoreService.search({ page: parsedPage, perPage: 5, term: parsedTerm });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedPage, parsedTerm]);

  const { bookResponse } = bookStoreService;

  return (
    <Suspense fallback={<Loading text="Books" />}>
      <BookList bookStore={bookResponse} />
    </Suspense>
  );
}
