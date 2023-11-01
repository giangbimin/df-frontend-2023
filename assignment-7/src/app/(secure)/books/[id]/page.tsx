import { BookDetail } from '../../../_components/page/BookDetail';
import { BookProvider } from '../../../_contexts/BookContext';
import { DeleteBookProvider } from '../../../_contexts/DeleteBookContext';

type BookPageProps = {
  params: {
    id: number;
  };
};

export default function ShowBookPage({ params: { id } }: BookPageProps) {
  return (
    <BookProvider>
      <DeleteBookProvider>
        <BookDetail id={id} />
      </DeleteBookProvider>
    </BookProvider>
  );
}
