import { BookType } from './BookType';

interface BookResponseType {
  status: boolean;
  message: string;
  data: BookType | undefined;
}

export type { BookResponseType };
