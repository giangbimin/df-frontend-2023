import { FC } from 'react';
import { GetBooksParams } from 'api';
import { BookSearch } from './BookSearch';
import { CreateBookButton } from './CreateBookButton';

type BookSearchProps = {
  searchCondition: GetBooksParams;
};

const BookTableHeader: FC<BookSearchProps> = ({ searchCondition }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2">
        <BookSearch searchCondition={searchCondition} />
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <CreateBookButton />
      </div>
    </div>
  );
};

export default BookTableHeader;
