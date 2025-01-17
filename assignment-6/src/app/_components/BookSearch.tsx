'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ListBookPayload } from '../_types';

type BookSearchProps = {
  searchCondition: ListBookPayload;
};

export const BookSearch: FC<BookSearchProps> = ({ searchCondition }) => {
  const router = useRouter();

  const [query, setQuery] = useState(searchCondition.query);

  const setStoredSearchQuery = () => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('query', query);
  };

  const handleSearch = useCallback(() => {
    const newParams = { ...searchCondition, query, page: 1 };
    const queryParams = Object.keys(newParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(newParams[key])}`,
      )
      .join('&');
    router.replace(`/books?${queryParams}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setStoredSearchQuery();
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <form className="flex items-center">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
        />
      </div>
    </form>
  );
};
