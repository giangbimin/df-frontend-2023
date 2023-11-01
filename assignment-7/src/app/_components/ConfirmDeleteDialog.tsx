import { FC } from 'react';
import toast from 'react-hot-toast';
import { useDeleteBookContext } from '../_contexts/DeleteBookContext';
import { Dialog } from './common/Dialog';

interface DialogProps {
  triggerSubmit?: () => void;
}

export const ConfirmDeleteDialog: FC<DialogProps> = ({ triggerSubmit }) => {
  const { currentBook, isShowDeleteConfirm, removeBook, hideDeleteConfirm } =
    useDeleteBookContext();
  if (currentBook === undefined || isShowDeleteConfirm === false) return null;
  const submitDeleteBook = async () => {
    try {
      await removeBook();
      toast('Delete Success!');
      hideDeleteConfirm();
      if (triggerSubmit !== undefined) triggerSubmit();
    } catch {
      toast('Delete false!');
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
