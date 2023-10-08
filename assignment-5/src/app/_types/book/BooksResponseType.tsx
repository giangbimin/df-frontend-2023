import { BookType } from './BookType';

interface BooksResponseType {
  page: number | 1;
  perPage: number | 5;
  total: number | 0;
  totalPages: number | 0;
  data: BookType[];
}

export type { BooksResponseType };

export const defaultBookStore: BooksResponseType = {
  page: 1,
  total: 0,
  totalPages: 0,
  data: [],
  perPage: 5,
};
