import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';
import { Metadata } from 'api';
import Pagination from './common/Pagination';

type BookPagingProps = {
  metadata: Metadata;
};

const BookTableFooter: FC<BookPagingProps> = ({ metadata }) => {
  const { page, pageSize, totalRecords, totalPages } = metadata;

  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (page: string, value: number) => {
      const params = new URLSearchParams(searchParams);
      params.set(page, value.toString());
      return params.toString();
    },
    [searchParams],
  );

  const generatePaginationArray = () => {
    const pageSet = new Set<number>();
    pageSet.add(1);
    if (page > 1) pageSet.add(page - 1);
    pageSet.add(page);
    if (page < totalPages) pageSet.add(page + 1);
    if (totalPages !== 0) pageSet.add(totalPages);
    const paginationArray = Array.from(pageSet);
    return paginationArray;
  };

  const paginationArray = generatePaginationArray();

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {`${Math.min((page - 1) * pageSize + 1, totalRecords)} - ${Math.min(
            page * pageSize,
            totalRecords,
          )}`}
        </span>
        &nbsp;of&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalRecords}
        </span>
      </span>
      <Pagination
        pathname={pathname}
        createQueryString={createQueryString}
        paginationArray={paginationArray}
        currentPage={page}
      />
    </nav>
  );
};

export default BookTableFooter;
