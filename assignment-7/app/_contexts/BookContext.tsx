'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { fetchWrapper } from '../_services/common/fetchWrapper';
import {
  Book,
  BookPayload,
  FetchResponse,
  defaultFetchResponse,
} from '../_types';

type BookContextProps = {
  currentBook: Book | undefined;
  setCurrentBook: Dispatch<SetStateAction<Book | undefined>>;
  updateBook: (id: string, bookPayload: BookPayload) => Promise<FetchResponse>;
};

const BookContext = createContext<BookContextProps>({
  currentBook: undefined,
  setCurrentBook: () => {},
  updateBook: async () => defaultFetchResponse,
});

export const BookProvider = ({ children }) => {
  const [currentBook, setCurrentBook] = useState<Book | undefined>(undefined);

  const updateBook = async (id: string, bookPayload: BookPayload) => {
    const response = await fetchWrapper(
      `https://develop-api.bookstore.dwarvesf.com/api/v1/books/${id}`,
      'PUT',
      bookPayload,
    );

    if (response.success) setCurrentBook(response.data as Book);
    return response;
  };

  const useBookContext = useMemo<BookContextProps>(
    () => ({
      currentBook,
      setCurrentBook,
      updateBook,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBook],
  );

  return (
    <BookContext.Provider value={useBookContext}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
