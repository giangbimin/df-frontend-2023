'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import { Book } from '../_types/api/book.d';
import { fetchWrapper } from '../_services/common/fetchWrapper';

type DeleteBookContextProps = {
  currentBook: Book | undefined;
  isShowDeleteConfirm: boolean;
  showDeleteConfirm: (book: Book) => void;
  hideDeleteConfirm: () => void;
  deleteBook: () => Promise<boolean>;
};

const DeleteBookContext = createContext<DeleteBookContextProps>({
  currentBook: undefined,
  isShowDeleteConfirm: false,
  showDeleteConfirm: () => {},
  hideDeleteConfirm: () => {},
  deleteBook: async () => false,
});

export const DeleteBookProvider = ({ children }) => {
  const [isShowDeleteConfirm, setIsShowDeleteConfirm] =
    useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book | undefined>(undefined);

  const deleteBook = async () => {
    if (!currentBook) return false;

    try {
      const response = await fetchWrapper(
        `https://develop-api.bookstore.dwarvesf.com/api/v1/books/${currentBook.id}`,
        'DELETE',
      );
      return response.success;
    } catch (error) {
      throw new Error(error);
    }
  };

  const showDeleteConfirm = (book: Book) => {
    setCurrentBook(book);
    setIsShowDeleteConfirm(true);
  };

  const hideDeleteConfirm = () => {
    setCurrentBook(undefined);
    setIsShowDeleteConfirm(false);
  };

  const useDeleteBookContext = useMemo<DeleteBookContextProps>(
    () => ({
      currentBook,
      deleteBook,
      isShowDeleteConfirm,
      showDeleteConfirm,
      hideDeleteConfirm,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBook, isShowDeleteConfirm],
  );

  return (
    <DeleteBookContext.Provider value={useDeleteBookContext}>
      {children}
    </DeleteBookContext.Provider>
  );
};

export const useDeleteBookContext = () => useContext(DeleteBookContext);
