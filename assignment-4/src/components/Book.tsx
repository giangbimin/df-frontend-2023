import { FC, useContext } from 'react';
import { DeleteBookFormContext } from '../contexts/DeleteBookFormContext';
import { BookType } from '../common/Types';

interface BookProps {
  book: BookType;
}
const Book: FC<BookProps> = ({ book }) => {
  const showDeleteForm = useContext<((book: BookType) => void) | null>(
    DeleteBookFormContext,
  );
  const onClickDelete = () => {
    if (showDeleteForm) {
      showDeleteForm(book);
    }
  };

  return (
    <tr className="cols-4">
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.topic}</td>
      <td>
        <button
          className="delete-button transparent-btn"
          onClick={onClickDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Book;
