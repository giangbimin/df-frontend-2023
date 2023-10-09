import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookLine from './BookLine';
import { BookTableHeader } from './BookTableHeader';
import { BookTableFooter } from './BookTableFooter';
import { BookType } from '../_types';
import { Dialog } from './common/Dialog';
import { useBookManagerService } from '../_helpers/client/UseBookManagerService';
import { useBookPopup } from '../_helpers/client/UseConfirmDeleteBook';
import Loading from '../loading';

export const BookList = () => {
  const searchParams = useSearchParams();
  const bookManager = useBookManagerService();
  const parsedPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
  const parsedTerm = searchParams?.get('term') || '';
  const popup = useBookPopup();

  useEffect(() => {
    bookManager.search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedPage, parsedTerm]);

  const { loading } = bookManager;
  const bookStore = bookManager.bookResponse;

  const openPopup = (book: BookType) => {
    popup.open(book);
  };

  const deleteBook = async () => {
    const status = await bookManager.delete(popup.book, false);
    if (status) {
      await bookManager.search();
      popup.close();
    }
  };

  if (loading) return <Loading text="Books" />;
  return (
    <>
      {popup.isShow && popup.book && (
        <Dialog
          message={`Are you sure you want to delete ${popup.book.title} book?`}
          onSubmit={() => {
            deleteBook();
          }}
          onClose={() => {
            popup.close();
          }}
        />
      )}

      <div id="books">
        <BookTableHeader />
        <div className="min-h-[345px] overflow-x-auto">
          {loading ? (
            <Loading text="Books" />
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-t dark:border-neutral-500">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-5 border-r dark:border-neutral-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 border-r dark:border-neutral-500"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 border-r dark:border-neutral-500"
                  >
                    Topic
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 border-r dark:border-neutral-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookStore.data.map((book) => (
                  <BookLine
                    book={book}
                    key={book.id}
                    handleClickDelete={() => {
                      openPopup(book);
                    }}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
        <BookTableFooter
          page={bookStore.page}
          perPage={bookStore.perPage}
          total={bookStore.total}
          totalPages={bookStore.totalPages}
        />
      </div>
    </>
  );
};
