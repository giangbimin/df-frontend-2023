import { FC } from 'react';
import { BooksType } from '../Types';

interface PaginationProps {
  bookStore: BooksType,
  onPageChange: (newPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ bookStore, onPageChange }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= bookStore.totalPages; i++) {
    pageNumbers.push(i);
  }

  const onPrevPage = () => {
    onPageChange(bookStore.searchTerm.page - 1);
  };

  const onNextPage = () => {
    onPageChange(bookStore.searchTerm.page + 1);
  };

  return (
    <div className="pagination-bar">
      <div className="pagination">
        <button onClick={onPrevPage}>&laquo;</button>
        {pageNumbers.map((page) => (
          <button className={bookStore.searchTerm.page === page ? 'active' : ''} key={page} onClick={() => onPageChange(page)}>{page}</button>
        ))}
        <button onClick={onNextPage}>&raquo;</button>
      </div>
    </div>
  );
};

export default Pagination;
