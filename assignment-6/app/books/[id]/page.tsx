import { BookDetail } from '../../_components/page/BookDetail';
import { BookProvider } from '../../_contexts/BookContext';
import { DeleteBookProvider } from '../../_contexts/DeleteBookContext';

export default function ShowBookPage({ params: { id } }) {
  return (
    <BookProvider>
      <DeleteBookProvider>
        <BookDetail id={id} />
      </DeleteBookProvider>
    </BookProvider>
  );
}
