import { BookList } from './_components/page/BookList';
import { BooksProvider } from './_contexts/BooksContext';

export default function HomePage() {
  return (
    <BooksProvider>
      <BookList />
    </BooksProvider>
  );
}
