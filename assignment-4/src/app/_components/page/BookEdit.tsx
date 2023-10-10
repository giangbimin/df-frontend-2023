'use client';

import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBookContext } from '../../_contexts/BookContext';
import CustomNotFound from '../../not-found';
import { BtnBack } from '../common/BtnBack';
import { useApplicationContext } from '../../_contexts/ApplicationContext';
import { BookType } from '../../_types';
import Loading from '../../loading';
import { BookForm } from '../BookForm';

interface BookProps {
  id: string;
}
export const BookEdit: FC<BookProps> = ({ id }) => {
  const { toasterSuccess, toasterError } = useApplicationContext();
  const { loading, showLoading, hideLoading } = useApplicationContext();
  const { currentBook, initBook, updateBook } = useBookContext();

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      await initBook(id);
    };
    fetchData();
    hideLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const onSubmit = async (book: BookType) => {
    const status = await updateBook(book);
    if (status) {
      router.push('/');
      toasterSuccess('Update Success!');
    } else {
      toasterError('Update False!');
    }
  };

  if (loading) return <Loading text={`Book id: ${id}`} />;
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
        </div>
      </div>
      <div className="space-y-3 md:space-y-0 md:space-x-4 p-4">
        <BookForm book={currentBook} onSubmit={onSubmit} disableEdit={false} />
      </div>
    </section>
  );
};
