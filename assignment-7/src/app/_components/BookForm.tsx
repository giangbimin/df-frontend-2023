'use client';

import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetTopics } from 'api';
import { ErrorMessage } from './common/ErrorMessage';
import { BookSchema, BookSchemaType } from '../_types/schema/BookSchema';
import Loading from '../loading';

interface BookProps {
  name?: string | '';
  author?: string | '';
  topicId: number | undefined;
  onSubmit: (name: string, author: string, topicId: number) => Promise<void>;
  disableEdit?: boolean;
}

export const BookForm: FC<BookProps> = ({
  name,
  author,
  topicId,
  onSubmit,
  disableEdit,
}) => {
  const currentValues = { name, author, topicId };
  const { data, isLoading } = useGetTopics();
  const validTopics = data?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookSchemaType>({
    resolver: zodResolver(BookSchema),
    defaultValues: currentValues,
  });

  if (isLoading) return <Loading text="Form" />;

  const triggerSubmit: SubmitHandler<BookSchemaType> = async (data) => {
    const updatedBook = {
      ...currentValues,
      name: data.name,
      author: data.author,
      topicId: data.topicId,
    };
    const { name, author, topicId } = updatedBook;
    await onSubmit(name, author, topicId);
  };

  const onSubmitForm = handleSubmit(triggerSubmit);

  return (
    <form className="space-y-8" onSubmit={onSubmitForm}>
      <div className="flex flex-col gap-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <label htmlFor="name">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name:
          </p>
          <ErrorMessage error={errors.name} />
          <input
            {...register('name')}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="name"
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
        <label htmlFor="topicId">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Topic:
          </p>
          <ErrorMessage error={errors.topicId} />
          <select
            id="topicId"
            {...register('topicId', { valueAsNumber: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="topicId"
            defaultValue={`${topicId}`}
            disabled={disableEdit}
          >
            <option value="0" hidden>
              Select category
            </option>
            {validTopics.map((topic) => (
              <option value={topic.id} key={topic.id}>
                {topic.name}
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
