'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { BookForm } from '../../../_components/BookForm';
import BookManagerService from '../../../_services/BookManagerService';
import { BookType } from '../../../_types';
import { useToasterService } from '../../../_helpers/client/useToasterService';
import { useAuthenticationService } from '../../../_helpers/client/useAuthenticationService';

export default function NewBookPage() {
  const session = useAuthenticationService();

  useEffect(() => {
    session.requireAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const defaultBook: BookType = {
    id: '',
    createdAt: 0,
    title: '',
    author: '',
    topic: '',
  };

  const toasterService = useToasterService();

  const onSubmit = async (book) => {
    toasterService.clear();
    try {
      const response = await BookManagerService.create(book);
      if (response.status) {
        router.replace('/');
        toasterService.success(response.message, true);
      } else {
        toasterService.error(response.message);
      }
    } catch (error) {
      toasterService.error(error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-xl tracking-tight font-extrabold  text-gray-900 dark:text-white">
            New Book
          </h2>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            All Books
          </Link>
        </div>
      </div>
      <div className="space-y-3 md:space-y-0 md:space-x-4 p-4">
        <BookForm book={defaultBook} onSubmit={onSubmit} disableEdit={false} />
      </div>
    </section>
  );
}
