import { useState, ChangeEvent, FC } from 'react'
import { BookType } from '../Types'

interface FormCreateProps {
  closeCreateForm: () => void
  addBook: (book: BookType) => void
}

const defaultBook: BookType = {
  id: '',
  createdAt: 0,
  title: '',
  author: '',
  topic: '',
}

const FormCreate: FC<FormCreateProps> = ({ closeCreateForm, addBook }) => {
  const [book, setBook] = useState(defaultBook)

  const handleInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setBook((prevBook) => ({ ...prevBook, title: e.target.value }))
  }

  const handleInputAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    setBook((prevBook) => ({ ...prevBook, author: e.target.value }))
  }

  const handleInputTopic = (e: ChangeEvent<HTMLSelectElement>) => {
    setBook((prevBook) => ({ ...prevBook, topic: e.target.value }))
  }

  const onCloseModal = () => {
    setBook(defaultBook)
    closeCreateForm()
  }

  const onSubmitModal = () => {
    if (isInvalidBook()) {
      alert('Please fill in all fields: Title, Author, and Topic.')
    } else {
      addBook(book)
      onCloseModal()
    }
  }

  const isInvalidBook = () => {
    return book.title === '' || book.author === '' || book.topic === ''
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="header-text">Add a New Book</h2>
        <button onClick={onCloseModal} className="close-modal transparent-btn">
          {' '}
          &times;
        </button>
      </div>
      <div className="modal-content">
        <form>
          <label htmlFor="title" className="form-group">
            <span className="form-label">Book Title:</span>
            <input
              className="form-input"
              type="text"
              name="title"
              id="title"
              autoComplete="off"
              value={book.title}
              placeholder="Enter Title"
              onChange={handleInputTitle}
            />
          </label>
          <label htmlFor="author" className="form-group">
            <span className="form-label">Book Author:</span>
            <input
              className="form-input"
              type="text"
              id="author"
              name="author"
              autoComplete="off"
              value={book.author}
              placeholder="Enter Author"
              onChange={handleInputAuthor}
            />
          </label>
          <label htmlFor="topic" className="form-group">
            <span className="form-label">Topic:</span>
            <select
              className="form-input form-input-select"
              name="topic"
              id="topic"
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
          </label>
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
  )
}

export default FormCreate
