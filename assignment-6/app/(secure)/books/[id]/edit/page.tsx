import { BookProvider } from '../../../../_contexts/BookContext';
import { BookEdit } from '../../../../_components/page/BookEdit';

export default function ShowBookPage({ params: { id } }) {
  return (
    <BookProvider>
      <BookEdit id={id} />
    </BookProvider>
  );
}
