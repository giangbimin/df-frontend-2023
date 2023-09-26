import { FC } from 'react';
import { BookType } from '../Types';
import Book from './Book';

interface BookListProps {
  books: BookType[];
}

const BookList: FC<BookListProps> = ({ books }) => {
  return (
    <div id="books">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
