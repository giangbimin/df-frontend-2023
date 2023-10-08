'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookForm } from '../../../_components/BookForm';
import CustomNotFound from '../../../not-found';
import { Dialog } from '../../../_components/common/Dialog';
import { useBookService } from '../../../_helpers/client/useBookService';

export default function ShowBookPage({ params: { id } }) {
  const bookStoreService = useBookService();

  useEffect(() => {
    bookStoreService.find(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = () => {
    bookStoreService.delete(currentBook);
  };

  const { currentBook } = bookStoreService;

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const showDeleteDialog = () => {
    setIsDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setIsDialogVisible(false);
  };

  if (currentBook === undefined) return <CustomNotFound />;
  return (
    <>
      <section className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 text-xl tracking-tight font-extrabold  text-gray-900 dark:text-white">
              Book {currentBook.id} Detail:
            </h2>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Link
              href="/books/new"
              className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              New Book
            </Link>
            <Link
              href={`/books/${currentBook.id}/edit`}
              className="flex items-center justify-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={showDeleteDialog}
              className="flex items-center justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="space-y-3 md:space-y-0 md:space-x-4 p-4">
          <BookForm book={currentBook} disableEdit />
        </div>
      </section>
      {isDialogVisible && (
        <Dialog
          message={`Are you sure you want to delete ${currentBook.title} book?`}
          onSubmit={() => {
            handleDeleteClick();
            hideDeleteDialog();
          }}
          onClose={hideDeleteDialog}
        />
      )}
    </>
  );
}
