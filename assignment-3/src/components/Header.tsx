import { FC } from 'react'

interface HeaderProps {
  showCreateForm: () => void
  onTermChange: (term: string) => void
}

const Header: FC<HeaderProps> = (props) => {
  const showCreateForm = () => {
    props.showCreateForm()
  }

  const onTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onTermChange(e.target.value)
  }

  return (
    <nav className="search-bar">
      <div>
        <input
          type="text"
          className="form-input"
          placeholder="Search by title"
          onChange={onTermChange}
        />
      </div>
      <button className="btn btn-primary" onClick={showCreateForm}>
        Add Book
      </button>
    </nav>
  )
}

export default Header
