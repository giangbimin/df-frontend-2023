'use client';

import {
  ChangeEvent,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { BookType } from '../_types';
import BookManagerService from '../_services/BookManagerService';

type BookContextProps = {
  currentBook: BookType | undefined;
  initBook: (id: string) => Promise<void>;
  changeBook: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateBook: () => Promise<boolean>;
};

const BookContext = createContext<BookContextProps>({
  currentBook: undefined,
  initBook: async () => {},
  changeBook: () => {},
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

  const updateBook = async () => {
    if (!currentBook) return false;
    const response = await BookManagerService.update(currentBook);
    if (response.status) {
      setCurrentBook(currentBook);
    }
    return response.status;
  };

  const changeBook = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentBook === undefined) return;
    const { name, value } = e.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const useBookContext = useMemo<BookContextProps>(
    () => ({
      currentBook,
      initBook,
      changeBook,
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
