import { createContext } from 'react';
import { BookType } from '../common/Types';

export const DeleteBookFormContext = createContext<
  ((book: BookType) => void) | null
>(null);
