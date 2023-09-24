import React from "react";

function Header(props) {

  const showCreateForm = () => {
    props.showCreateForm();
  }

  const onTermChange = (e) => {
    props.onTermChange(e.target.value);
  };

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
  );
}

export default Header;