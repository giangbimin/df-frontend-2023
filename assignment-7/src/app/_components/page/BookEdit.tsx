'use client';

import { FC } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useGetBook } from 'api';
import { useBookContext } from '../../_contexts/BookContext';
import CustomNotFound from '../../not-found';
import { BtnBack } from '../common/BtnBack';
import { BookForm } from '../BookForm';
import Loading from '../../loading';

interface BookProps {
  id: number;
}
export const BookEdit: FC<BookProps> = ({ id }) => {
  const { update } = useBookContext();

  const { data, isLoading } = useGetBook(id);
  if (isLoading) return <Loading text="Book" />;
  if (!data || !data.data) return <CustomNotFound />;
  const currentBook = data.data;

  const onSubmit = async (name: string, author: string, topicId: number) => {
    const response = await update(id, { name, author, topicId });
    if (response) {
      toast('Update Success');
    } else {
      toast('Update False');
    }
  };

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
        <BookForm
          name={currentBook.name}
          author={currentBook.author}
          topicId={currentBook.topic?.id}
          onSubmit={onSubmit}
          disableEdit={false}
        />
      </div>
    </section>
  );
};
