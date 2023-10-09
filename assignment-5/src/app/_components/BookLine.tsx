import { FC } from 'react';
import Link from 'next/link';
import { BookType } from '../_types';

interface BookProps {
  book: BookType;
  handleClickDelete: () => void;
}
const BookLine: FC<BookProps> = ({ book, handleClickDelete }) => {
  return (
    <tr className="border-b dark:border-gray-700">
      <th className="px-4 py-3 border-r dark:border-neutral-500 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {book.title}
      </th>
      <td className="px-4 py-3 border-r dark:border-neutral-500">
        {book.author}
      </td>
      <td className="px-4 py-3 border-r dark:border-neutral-500">
        {book.topic}
      </td>
      <td className="px-4 py-3 border-r dark:border-neutral-500 flex">
        <button
          type="button"
          onClick={handleClickDelete}
          className="block py-1 px-2 underline underline-offset-4 text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-primary border-r border-primary-500 dark:border-neutral-500"
        >
          Delete
        </button>
        <Link
          className="block py-1 px-2 underline underline-offset-4 text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white border-r border-primary-500 dark:border-neutral-500"
          href={`/books/${book.id}`}
        >
          View
        </Link>
        <Link
          href={`/books/${book.id}/edit`}
          className="block py-1 px-2  underline underline-offset-4 text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-primary"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default BookLine;
