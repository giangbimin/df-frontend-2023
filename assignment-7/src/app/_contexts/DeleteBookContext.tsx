'use client';

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { deleteBook, Book } from 'api';

type DeleteBookContextProps = {
  currentBook: Book | undefined;
  isShowDeleteConfirm: boolean;
  showDeleteConfirm: (book: Book) => void;
  hideDeleteConfirm: () => void;
  removeBook: () => Promise<void>;
};

const DeleteBookContext = createContext<DeleteBookContextProps>({
  currentBook: undefined,
  isShowDeleteConfirm: false,
  showDeleteConfirm: () => {},
  hideDeleteConfirm: () => {},
  removeBook: async () => {},
});

export const DeleteBookProvider = ({ children }: { children: ReactNode }) => {
  const [isShowDeleteConfirm, setIsShowDeleteConfirm] =
    useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book | undefined>(undefined);

  const removeBook = async () => {
    if (!currentBook) return;
    try {
      await deleteBook(currentBook.id);
    } catch (error) {
      throw new Error('Delete Error');
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
      removeBook,
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
