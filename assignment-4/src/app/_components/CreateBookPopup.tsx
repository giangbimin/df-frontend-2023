import { useApplicationContext } from '../_contexts/ApplicationContext';
import { useBooksContext } from '../_contexts/BooksContext';
import { BookType } from '../_types';
import { BookForm } from './BookForm';

export const CreateBookPopup = () => {
  const { toasterSuccess, toasterError } = useApplicationContext();
  const defaultBook: BookType = {
    id: '',
    createdAt: 0,
    title: '',
    author: '',
    topic: '',
  };

  const { isShowCreateForm, hideCreateForm, createBook, refresh } =
    useBooksContext();

  if (!isShowCreateForm) return null;

  const onSubmitCreateBook = async (book: BookType) => {
    const status = await createBook(book);
    if (status) {
      toasterSuccess('Created!');
      refresh();
      hideCreateForm();
    } else {
      toasterError('Create False');
    }
  };

  return (
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
            <h3 className="font-bold font-2xl mb-4 text-gray-400 dark:text-white">
              Add Book
            </h3>
            <BookForm
              book={defaultBook}
              onSubmit={onSubmitCreateBook}
              disableEdit={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
