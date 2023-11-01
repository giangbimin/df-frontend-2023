import { BookProvider } from '../../../../_contexts/BookContext';
import { BookEdit } from '../../../../_components/page/BookEdit';

type BookPageProps = {
  params: {
    id: number;
  };
};

export default function EditBookPage({ params: { id } }: BookPageProps) {
  return (
    <BookProvider>
      <BookEdit id={id} />
    </BookProvider>
  );
}
