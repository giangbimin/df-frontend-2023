'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { BookForm } from '../../../../_components/BookForm';
import CustomNotFound from '../../../../not-found';
import { BookType } from '../../../../_types';
import { useBookManagerService } from '../../../../_helpers/client/UseBookManagerService';
import { useAuthenticationService } from '../../../../_helpers/client/UseAuthenticationService';
import { BtnBack } from '../../../../_components/common/BtnBack';
import Loading from '../../../../loading';

export default function ShowBookPage({ params: { id } }) {
  const session = useAuthenticationService();
  const bookManager = useBookManagerService();

  const onSubmit = async (book: BookType) => {
    bookManager.update(book);
  };

  useEffect(() => {
    session.requireAuth();
    bookManager.find(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentBook, loading } = bookManager;

  if (loading) return <Loading text="Book" />;
  if (currentBook === undefined) return <CustomNotFound />;
  return (
    <section className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <BtnBack />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            All Books
          </Link>
          <Link
            href="/books/new"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            New Book
          </Link>
        </div>
      </div>
      <div className="space-y-3 md:space-y-0 md:space-x-4 p-4">
        <BookForm book={currentBook} onSubmit={onSubmit} disableEdit={false} />
      </div>
    </section>
  );
}
