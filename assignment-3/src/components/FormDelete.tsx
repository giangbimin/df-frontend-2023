import React, { FC } from 'react';
import { BookType, DeleteFormStateType } from '../Types';

interface FormDeleteProps {
  formDelete: DeleteFormStateType;
  deleteBook: (book: BookType | null) => void;
  closeDeleteForm: () => void;
}

const FormDelete: FC<FormDeleteProps> = ({
  formDelete,
  deleteBook,
  closeDeleteForm,
}) => {
  const handleDeleteBook = () => {
    deleteBook(formDelete.book);
    closeDeleteForm();
  };

  return (
    <div className={`modal${formDelete.isShow ? ' is-visible' : ''}`}>
      <div className="modal-header">
        <h2 className="header-text">Delete Book</h2>
        <button
          onClick={closeDeleteForm}
          className="close-modal transparent-btn">
          {' '}
          &times;
        </button>
      </div>
      <div className="modal-content">
        <p>
          Do you want to delete
          <span>{formDelete.book?.title}</span>
          &nbsp;book?
        </p>
        <div className="btns modal-btns">
          <button
            type="button"
            className="btn modal-btn"
            onClick={closeDeleteForm}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary modal-btn"
            onClick={handleDeleteBook}>
            Destroy
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormDelete;
