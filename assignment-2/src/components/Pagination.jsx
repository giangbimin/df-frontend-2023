import React from "react";

const Pagination = ({ bookStore, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= bookStore.totalPages; i++) {
    pageNumbers.push(i);
  }

  const onPrevPage = () => {
    onPageChange(bookStore.page - 1);
  }

  const onNextPage = () => {
    onPageChange(bookStore.page + 1);
  }


  return (
    <div className="pagination-bar">
      <ul className="pagination">
        <li onClick={onPrevPage}>&laquo;</li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={bookStore.page === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
        <li onClick={onNextPage}>&raquo;</li>
      </ul>
    </div>
  );
};

export default Pagination;
