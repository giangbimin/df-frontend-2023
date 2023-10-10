'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBookContext } from '../../_contexts/BookContext';
import { useDeleteBookContext } from '../../_contexts/DeleteBookContext';
import CustomNotFound from '../../not-found';
import { BtnBack } from '../common/BtnBack';
import { ConfirmDeleteDialog } from '../ConfirmDeleteDialog';
import { useApplicationContext } from '../../_contexts/ApplicationContext';

interface BookProps {
  id: string;
}
export const BookDetail: FC<BookProps> = ({ id }) => {
  const { showLoading, hideLoading } = useApplicationContext();
  const { currentBook, initBook } = useBookContext();
  const { showDeleteConfirm } = useDeleteBookContext();

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

  const triggerSubmit = () => {
    router.replace('/');
  };

  if (currentBook === undefined) return <CustomNotFound />;
  return (
    <section className="bg-white dark:bg-gray-800 px-4 py-4">
      <ConfirmDeleteDialog triggerSubmit={triggerSubmit} />
      <BtnBack />
      <div className="flex flex-col gap-8 mb-8">
        <h2 className="font-bold text-2xl">{currentBook.title}</h2>
        <div className="flex flex-col gap-2">
          <p>
            <strong>Author:&#32;</strong>
            {currentBook.author}
          </p>
          <p>
            <strong>Topic:&#32;</strong>
            {currentBook.topic}
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
