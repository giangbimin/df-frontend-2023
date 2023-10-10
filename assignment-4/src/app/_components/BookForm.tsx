'use client';

import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookSchemaType, BookType, BookSchema, validTopics } from '../_types';
import { ErrorMessage } from './common/ErrorMessage';

interface BookProps {
  book: BookType;
  onSubmit?: (curBook: BookType) => Promise<void>;
  disableEdit: boolean;
}

export const BookForm: FC<BookProps> = ({ book, onSubmit, disableEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookSchemaType>({
    resolver: zodResolver(BookSchema),
  });

  const onSubmitForm: SubmitHandler<BookSchemaType> = (data) => {
    if (onSubmit) {
      onSubmit({
        ...book,
        title: data.title,
        author: data.author,
        topic: data.topic,
      });
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col gap-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <Controller
          name="title"
          control={control}
          defaultValue={book.title}
          render={({ field }) => (
            <label htmlFor="title">
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title:
              </p>
              <ErrorMessage error={errors.title} />
              <input
                {...field}
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Book Title"
                disabled={disableEdit}
                required
              />
            </label>
          )}
        />
        <Controller
          name="author"
          control={control}
          defaultValue={book.author}
          render={({ field }) => (
            <label htmlFor="author">
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Author:
              </p>
              <ErrorMessage error={errors.author} />
              <input
                {...field}
                type="text"
                id="author"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Book Author"
                disabled={disableEdit}
                required
              />
            </label>
          )}
        />
        <Controller
          name="topic"
          control={control}
          defaultValue={book.topic}
          render={({ field }) => (
            <label htmlFor="category">
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Topic:
              </p>
              <ErrorMessage error={errors.topic} />
              <select
                {...field}
                id="category"
                disabled={disableEdit}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
          )}
        />
      </div>
      {!disableEdit && (
        <div className="w-full text-right">
          <button
            type="submit"
            className="text-center text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
};
