'use client';

import { ChangeEvent, FC } from 'react';
import { BookType, validTopics } from '../_types';

interface BookProps {
  book: BookType;
  onSubmit: () => Promise<void>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disableEdit?: boolean;
}

export const BookForm: FC<BookProps> = ({
  book,
  onSubmit,
  onChange,
  disableEdit,
}) => {
  const onSubmitForm = async (e) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <form className="space-y-8">
      <div className="flex flex-col gap-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <label htmlFor="title">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title:
          </p>
          <input
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="title"
            type="text"
            value={book.title}
            placeholder="Book Title"
            onChange={onChange}
            disabled={disableEdit}
            required
          />
        </label>
        <label htmlFor="author">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Author:
          </p>
          <input
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="author"
            type="text"
            value={book.author}
            placeholder="Book Author"
            onChange={onChange}
            disabled={disableEdit}
            required
          />
        </label>
        <label htmlFor="topic">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Topic:
          </p>
          <select
            id="topic"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="topic"
            value={book.topic}
            onChange={onChange}
            disabled={disableEdit}
          >
            <option value="" hidden>
              Select category
            </option>
            {validTopics.map((topic) => (
              <option value={topic} key={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!disableEdit && (
        <div className="w-full text-right">
          <button
            type="button"
            onClick={onSubmitForm}
            className="text-center text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
};
