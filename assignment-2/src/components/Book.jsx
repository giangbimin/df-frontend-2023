import React, { useContext } from 'react';
import { DeleteBookFormContext } from '../contexts/DeleteBookFormContext';

function Book({book}) {
  const showDeleteForm = useContext(DeleteBookFormContext);

  const onClickDelete = () => {
    showDeleteForm(book);
  }

  return (
    <tr>
      <td>{ book.title }</td>
      <td>{ book.author }</td>
      <td>{ book.topic }</td>
      <td>
        <span className="delete-button" onClick={onClickDelete}> Delete </span>
      </td>
    </tr>
  );
}

export default Book;