'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Book, UpdateBookRequest, updateBook } from 'api';

type BookContextProps = {
  currentBook: Book | undefined;
  setCurrentBook: Dispatch<SetStateAction<Book | undefined>>;
  update: (
    id: number,
    updateBookRequest: UpdateBookRequest,
  ) => Promise<Book | undefined>;
};

const BookContext = createContext<BookContextProps>({
  currentBook: undefined,
  setCurrentBook: () => {},
  update: async () => undefined,
});

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [currentBook, setCurrentBook] = useState<Book | undefined>(undefined);

  const update = async (id: number, updateBookRequest: UpdateBookRequest) => {
    const response = await updateBook(id, updateBookRequest);
    const book = response.data;
    if (response) setCurrentBook(book);
    return book;
  };

  const useBookContext = useMemo<BookContextProps>(
    () => ({
      currentBook,
      setCurrentBook,
      update,
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
