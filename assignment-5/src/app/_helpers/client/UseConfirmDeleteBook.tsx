import { create } from 'zustand';
import { BookType } from '../../_types';

interface PopupState {
  book: BookType | undefined;
  isShow: boolean;
}

const initialState = {
  book: undefined,
  isShow: false,
};

const popupState = create<PopupState>(() => initialState);

interface BookPopupState extends PopupState {
  open: (book: BookType) => void;
  close: () => void;
}

export function useBookPopup(): BookPopupState {
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
