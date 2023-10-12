import { BookType } from './BookType';

interface ApiBookResponseType {
  page: number | 1;
  perPage: number | 5;
  total: number | 0;
  totalPages: number | 0;
  books: BookType[];
}

interface BooksResponseType {
  status: true;
  data: ApiBookResponseType;
}

export type { BooksResponseType };

export const defaultBookStore: BooksResponseType = {
  status: true,
  data: {
    page: 1,
    total: 0,
    totalPages: 0,
    perPage: 5,
    books: [],
  },
};
