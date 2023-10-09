import { create } from 'zustand';
import { BookType } from '../_types';

interface DeleteBookPopupState {
  book: BookType | undefined;
  isShow: boolean;
}

const initialState = {
  book: undefined,
  isShow: false,
};

const popupState = create<DeleteBookPopupState>(() => initialState);

interface UseDeleteBookPopup extends DeleteBookPopupState {
  open: (book: BookType) => void;
  close: () => void;
}

export function useDeleteBookPopup(): UseDeleteBookPopup {
  const { book, isShow } = popupState();

  return {
    book,
    isShow,
    open: (currentBook) => {
      popupState.setState({ book: currentBook, isShow: true });
    },
    close: () => {
      popupState.setState({ book: undefined, isShow: false });
    },
  };
}
