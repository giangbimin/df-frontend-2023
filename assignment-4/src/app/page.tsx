'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BookStoreType, SearchTermType } from '../common/Types';
import BookManagerService from '../services/BookManagerService';
import { BookList } from './components/BookList';

const defaultBookStore: BookStoreType = {
  page: 1,
  total: 0,
  totalPages: 0,
  data: [],
  perPage: 5,
};

export default function HomePage() {
  const searchParams = useSearchParams();
  const [bookStore, setBookStore] = useState<BookStoreType>(defaultBookStore);
  const searchBook = async (curSearchTerm: SearchTermType) => {
    const result = await BookManagerService.getList(curSearchTerm);
    setBookStore(result);
  };

  useEffect(() => {
    const parsedPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
    const parsedTerm = searchParams?.get('term') || '';
    const searchTerm: SearchTermType = {
      page: parsedPage,
      perPage: 5,
      term: parsedTerm,
    };

    searchBook(searchTerm);
  }, [searchParams]);

  return <BookList bookStore={bookStore} />;
}
