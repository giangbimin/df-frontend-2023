'use client';

import { Suspense } from 'react';
import { BookList } from './_components/BookList';
import Loading from './loading';

export default function HomePage() {
  return (
    <Suspense fallback={<Loading text="Books" />}>
      <BookList />
    </Suspense>
  );
}
