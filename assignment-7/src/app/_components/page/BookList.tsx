import { FC } from 'react';
import BookLine from '../BookLine';
import { DeleteBookProvider } from '../../_contexts/DeleteBookContext';
import { ConfirmDeleteDialog } from '../ConfirmDeleteDialog';
import { Book } from '../../_types';

interface BookListProps {
  books: Book[];
}
const BookList: FC<BookListProps> = ({ books }) => {
  return (
    <div className="min-h-[345px] overflow-x-auto">
      <DeleteBookProvider>
        <ConfirmDeleteDialog />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-t dark:border-neutral-500">
            <tr>
              <th
                scope="col"
                className="px-4 py-5 border-r dark:border-neutral-500"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-5 border-r dark:border-neutral-500"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-4 py-5 border-r dark:border-neutral-500"
              >
                Topic
              </th>
              <th
                scope="col"
                className="px-4 py-5 border-r dark:border-neutral-500"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookLine book={book} key={book.id} />
            ))}
          </tbody>
        </table>
      </DeleteBookProvider>
    </div>
  );
};

export default BookList;
