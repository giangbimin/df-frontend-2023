import { FC } from 'react';
import { useBooksContext } from '../_contexts/BooksContext';
import { useDeleteBookContext } from '../_contexts/DeleteBookContext';
import { Dialog } from './common/Dialog';
import { useApplicationContext } from '../_contexts/ApplicationContext';

interface DialogProps {
  triggerSubmit?: () => void;
}

export const ConfirmDeleteDialog: FC<DialogProps> = ({ triggerSubmit }) => {
  const { toasterSuccess, toasterError } = useApplicationContext();
  const { currentBook, isShowDeleteConfirm, deleteBook, hideDeleteConfirm } =
    useDeleteBookContext();
  const { refresh } = useBooksContext();

  if (currentBook === undefined || isShowDeleteConfirm === false) return null;

  const submitDeleteBook = async () => {
    const status = await deleteBook();
    if (status) {
      toasterSuccess('Delete Success!');
      hideDeleteConfirm();
      refresh();
      if (triggerSubmit !== undefined) triggerSubmit();
    } else {
      toasterError('Delete false!');
    }
  };
  return (
    <Dialog
      message={`Are you sure you want to delete ${currentBook.title} book?`}
      onSubmit={() => {
        submitDeleteBook();
      }}
      onClose={() => {
        hideDeleteConfirm();
      }}
    />
  );
};
