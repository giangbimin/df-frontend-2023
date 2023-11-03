import { FC } from 'react';
import { useSWRConfig } from 'swr';
import { useDeleteBookContext } from '../_contexts/DeleteBookContext';
import { Dialog } from './common/Dialog';
import { useApplicationContext } from '../_contexts/ApplicationContext';

interface DialogProps {
  triggerSubmit?: () => void;
}

export const ConfirmDeleteDialog: FC<DialogProps> = ({ triggerSubmit }) => {
  const { mutate } = useSWRConfig();
  const { toasterSuccess, toasterError } = useApplicationContext();
  const { currentBook, isShowDeleteConfirm, deleteBook, hideDeleteConfirm } =
    useDeleteBookContext();

  if (currentBook === undefined || isShowDeleteConfirm === false) return null;

  const submitDeleteBook = async () => {
    const status = await deleteBook();
    if (status) {
      toasterSuccess('Delete Success!');
      hideDeleteConfirm();
      mutate((key) => typeof key === 'string' && key.startsWith('/books'));
      if (triggerSubmit !== undefined) triggerSubmit();
    } else {
      toasterError('Delete false!');
    }
  };
  return (
    <Dialog
      message={`Are you sure you want to delete ${currentBook.name} book?`}
      onSubmit={() => {
        submitDeleteBook();
      }}
      onClose={() => {
        hideDeleteConfirm();
      }}
    />
  );
};
