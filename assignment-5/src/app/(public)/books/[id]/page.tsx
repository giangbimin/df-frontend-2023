'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomNotFound from '../../../not-found';
import { Dialog } from '../../../_components/common/Dialog';
import { BtnBack } from '../../../_components/common/BtnBack';
import { useBookManagerService } from '../../../_helpers/UseBookManagerService';
import { useDeleteBookPopup } from '../../../_helpers/UseDeleteBookPopup';
import { BookType } from '../../../_types';
import Loading from '../../../loading';
import { useAuthenticationService } from '../../../_helpers/UseAuthenticationService';

export default function ShowBookPage({ params: { id } }) {
  const session = useAuthenticationService();
  const bookManager = useBookManagerService();
  const popup = useDeleteBookPopup();
  const router = useRouter();

  useEffect(() => {
    bookManager.find(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPopup = async (book: BookType) => {
    const requireLogin = await session.requireAuth();
    if (requireLogin) return;
    popup.open(book);
  };

  const deleteBook = async () => {
    const requireLogin = await session.requireAuth();
    if (requireLogin) return;
    const status = await bookManager.delete(popup.book, true);
    if (status) {
      popup.close();
      router.replace('/');
    }
  };

  const { currentBook, loading } = bookManager;

  if (loading) return <Loading text="Book" />;
  if (currentBook === undefined) return <CustomNotFound />;
  return (
    <>
      {popup.isShow && popup.book && (
        <Dialog
          message={`Are you sure you want to delete ${popup.book.title} book?`}
          onSubmit={() => {
            deleteBook();
          }}
          onClose={() => {
            popup.close();
          }}
        />
      )}
      <section className="bg-white dark:bg-gray-800 px-4 py-4">
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
            openPopup(currentBook);
          }}
          className="underline underline-offset-4 text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Delete
        </button>
      </section>
    </>
  );
}
