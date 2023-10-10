'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import { BookType } from '../_types';
import BookManagerService from '../_services/BookManagerService';

type BookContextProps = {
  currentBook: BookType | undefined;
  initBook: (id: string) => Promise<void>;
  updateBook: (book: BookType) => Promise<boolean>;
};

const BookContext = createContext<BookContextProps>({
  currentBook: undefined,
  initBook: async () => {},
  updateBook: async () => false,
});

export const BookProvider = ({ children }) => {
  const [currentBook, setCurrentBook] = useState<BookType | undefined>(
    undefined,
  );

  const initBook = async (id: string) => {
    try {
      const response = await BookManagerService.find(id);
      if (response.status) {
        setCurrentBook(response.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const updateBook = async (book: BookType) => {
    const response = await BookManagerService.update(book);
    if (response.status) {
      setCurrentBook(book);
    }
    return response.status;
  };

  const useBookContext = useMemo<BookContextProps>(
    () => ({
      currentBook,
      initBook,
      updateBook,
    }),
    [currentBook],
  );

  return (
    <BookContext.Provider value={useBookContext}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
