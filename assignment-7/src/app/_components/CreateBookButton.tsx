import { useState } from 'react';
import toast from 'react-hot-toast';
import { createBook } from 'api';
import { BookForm } from './BookForm';

export const CreateBookButton = () => {
  const [isShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);

  const showCreateForm = () => {
    setIsShowCreateForm(true);
  };

  const hideCreateForm = () => {
    setIsShowCreateForm(false);
  };

  const onSubmit = async (name?: string, author?: string, topicId?: number) => {
    const response = await createBook({
      name: name || '',
      author: author || '',
      topicId: topicId || 0,
    });
    if (response) {
      toast('Create Success');
      hideCreateForm();
    } else {
      toast('Create False');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={showCreateForm}
        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        Add Book
      </button>

      {isShowCreateForm && (
        <div
          id="new-book-popup"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full flex"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 border-2 border-primary sm:p-5">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={hideCreateForm}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-3 text-left">
                <h3 className="font-bold text-2xl mb-4 text-gray-400 dark:text-white">
                  Add Book
                </h3>
                <BookForm
                  name=""
                  author=""
                  topicId={undefined}
                  onSubmit={onSubmit}
                  disableEdit={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
