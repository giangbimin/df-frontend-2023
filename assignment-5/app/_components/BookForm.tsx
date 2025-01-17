'use client';

import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BookSchema, BookSchemaType, BookType, validTopics } from '../_types';
import { ErrorMessage } from './common/ErrorMessage';

interface BookProps {
  book: BookType;
  onSubmit: (book: BookType) => Promise<void>;
  disableEdit?: boolean;
}

export const BookForm: FC<BookProps> = ({ book, onSubmit, disableEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookSchemaType>({
    resolver: zodResolver(BookSchema),
    defaultValues: book,
  });

  const triggerSubmit: SubmitHandler<BookSchemaType> = async (data) => {
    const updatedBook = {
      ...book,
      title: data.title,
      author: data.author,
      topic: data.topic,
    };
    await onSubmit(updatedBook);
  };
  const onSubmitForm = handleSubmit(triggerSubmit);

  return (
    <form className="space-y-8" onSubmit={onSubmitForm}>
      <div className="flex flex-col gap-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <label htmlFor="title">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title:
          </p>
          <ErrorMessage error={errors.title} />
          <input
            {...register('title')}
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="title"
            type="text"
            placeholder="Book Title"
            disabled={disableEdit}
            required
          />
        </label>
        <label htmlFor="author">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Author:
          </p>
          <ErrorMessage error={errors.author} />
          <input
            id="author"
            {...register('author')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="author"
            type="text"
            placeholder="Book Author"
            disabled={disableEdit}
            required
          />
        </label>
        <label htmlFor="topic">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Topic:
          </p>
          <ErrorMessage error={errors.topic} />
          <select
            id="topic"
            {...register('topic')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="topic"
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
