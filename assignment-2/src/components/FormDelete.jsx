import React from 'react';

const FormDelete = ({ formDelete, deleteBook, closeDeleteForm }) => {
  const handleDeleteBook = () => {
    deleteBook(formDelete.book);
    closeDeleteForm();
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="header-text">Delete Book</h2>
        <span className="close-modal" onClick={closeDeleteForm}>
          &times;
        </span>
      </div>
      <div className="modal-content">
        <p>
          Do you want delete <span>{formDelete.book.title}</span> book?
        </p>
        <div className="btns modal-btns">
          <button
            type="button"
            className="btn modal-btn"
            onClick={closeDeleteForm}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary modal-btn"
            onClick={handleDeleteBook}
          >
            Destroy
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormDelete;