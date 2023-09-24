import React, { useState } from "react";

const FormCreate = (props) => {
  const [book, setBook] = useState({ title: "", author: "", topic: "" });

  const handleInputTitle = (e) => {
    setBook((prevBook) => ({ ...prevBook, title: e.target.value }));
  };

  const handleInputAuthor = (e) => {
    setBook((prevBook) => ({ ...prevBook, author: e.target.value }));
  };

  const handleInputTopic = e => {
    setBook((prevBook) => ({ ...prevBook, topic: e.target.value }));
  };

  const onCloseModal = () => {
    setBook({ title: "", author: "", topic: "" });
    props.closeCreateForm();
  };


  const onSubmitModal = () => {
    if (!!isInvalidBook()) {
      alert("Please fill in all fields: Title, Author, and Topic.");
    } else {
      props.addBook(book);
      onCloseModal();
    }
  }

  const isInvalidBook = () => {
    return (book.title === "" || book.author === "" || book.topic === "");
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="header-text">Add a New Book</h2>
        <span className="close-modal" onClick={onCloseModal}>
          &times;
        </span>
      </div>
      <div className="modal-content">
        <form>
          <div className="form-group">
            <label className="form-label">Book Title:</label>
            <input
              className="form-input"
              type="text"
              name="title"
              autoComplete="off"
              value={book.title}
              placeholder="Enter Title"
              onChange={handleInputTitle}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Book Author:</label>
            <input
              className="form-input"
              type="text"
              name="author"
              autoComplete="off"
              value={book.author}
              placeholder="Enter Author"
              onChange={handleInputAuthor}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Topic:</label>
            <select
              className="form-input form-input-select"
              name="topic"
              value={book.topic}
              onChange={handleInputTopic}
            >
              <option value="" disabled hidden>
                Select Topic
              </option>
              <option value="Programming">Programming</option>
              <option value="Database">Database</option>
              <option value="DepOps">DepOps</option>
              <option value="FrontEnd">FrontEnd</option>
              <option value="BackEnd">BackEnd</option>
            </select>
          </div>
          <div className="btns modal-btns">
            <button
              type="button"
              className="btn modal-btn"
              onClick={onCloseModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary modal-btn"
              onClick={onSubmitModal}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreate;
