'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useGetBook } from 'api';
import { useBookContext } from '../../_contexts/BookContext';
import { useDeleteBookContext } from '../../_contexts/DeleteBookContext';
import CustomNotFound from '../../not-found';
import { BtnBack } from '../common/BtnBack';
import { ConfirmDeleteDialog } from '../ConfirmDeleteDialog';
import Loading from '../../loading';

interface BookProps {
  id: number;
}
export const BookDetail: FC<BookProps> = ({ id }) => {
  const router = useRouter();
  const { currentBook, setCurrentBook } = useBookContext();
  const { showDeleteConfirm } = useDeleteBookContext();
  const { data, isLoading } = useGetBook(id);
  if (isLoading) return <Loading text="Book" />;
  setCurrentBook(data?.data);
  if (!currentBook) return <CustomNotFound />;

  const triggerSubmit = () => {
    router.replace('/');
  };

  return (
    <section className="bg-white dark:bg-gray-800 px-4 py-4">
      <ConfirmDeleteDialog triggerSubmit={triggerSubmit} />
      <BtnBack />
      <div className="flex flex-col gap-8 mb-8">
        <h2 className="font-bold text-2xl">{currentBook.name}</h2>
        <div className="flex flex-col gap-2">
          <p>
            <strong>Author:&#32;</strong>
            {currentBook.author}
          </p>
          <p>
            <strong>Topic:&#32;</strong>
            {currentBook.topic?.id}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          showDeleteConfirm(currentBook);
        }}
        className="underline underline-offset-4 text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        Delete
      </button>
    </section>
  );
};
