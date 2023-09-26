import { BookType } from '../Types'

type BookProps = {
  book: BookType
}

const onClickDelete: () => void = () => {
  console.log('onClickDelete')
}

export const Book = ({ book }: BookProps) => (
  <tr>
    <td>{book.title}</td>
    <td>{book.author}</td>
    <td>{book.topic}</td>
    <td>
      <button className="delete-button" onClick={onClickDelete}>
        Delete
      </button>
    </td>
  </tr>
)
