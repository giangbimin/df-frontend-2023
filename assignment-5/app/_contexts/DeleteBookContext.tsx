'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import { BookType } from '../_types';
import BookManagerService from '../_services/BookManagerService';

type DeleteBookContextProps = {
  currentBook: BookType | undefined;
  isShowDeleteConfirm: boolean;
  showDeleteConfirm: (book: BookType) => void;
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
  const [currentBook, setCurrentBook] = useState<BookType | undefined>(
    undefined,
  );

  const deleteBook = async () => {
    if (!currentBook) return false;
    const response = await BookManagerService.delete(currentBook);
    return response.status;
  };

  const showDeleteConfirm = (book: BookType) => {
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
