'use client';

import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import { useToasterService } from './useToasterService';
import BookManagerService from '../../_services/BookManagerService';
import {
  BookType,
  BooksResponseType,
  SearchConditionType,
  defaultBookStore,
  defaultSearchCondition,
} from '../../_types';
import { useAuthenticationService } from './useAuthenticationService';

interface BookStoreStorage {
  currentBook: BookType | undefined;
  bookResponse: BooksResponseType;
  searchCondition: SearchConditionType;
}

const initialState = {
  currentBook: undefined,
  bookResponse: defaultBookStore,
  searchCondition: defaultSearchCondition,
};

const booksStorage = create<BookStoreStorage>(() => initialState);

interface BookStore extends BookStoreStorage {
  reload: () => Promise<void>;
  search: (searchCondition: SearchConditionType) => Promise<void>;
  create: (curBook: BookType) => Promise<void>;
  find: (id: string) => Promise<void>;
  update: (curBook: BookType) => Promise<void>;
  delete: (curBook: BookType | undefined) => Promise<void>;
}

export function useBookService(): BookStore {
  const router = useRouter();
  const toasterService = useToasterService();
  const { currentBook, bookResponse, searchCondition } = booksStorage();
  const session = useAuthenticationService();

  return {
    currentBook,
    bookResponse,
    searchCondition,
    reload: async () => {
      try {
        const newBookResponse =
          await BookManagerService.getList(searchCondition);
        booksStorage.setState({ bookResponse: newBookResponse });
      } catch (error) {
        toasterService.error(error);
      }
    },
    search: async (newSearchCondition: SearchConditionType) => {
      try {
        const newBookResponse =
          await BookManagerService.getList(newSearchCondition);
        booksStorage.setState({
          bookResponse: newBookResponse,
          searchCondition: newSearchCondition,
        });
      } catch (error) {
        toasterService.error(error);
      }
    },
    create: async (book: BookType) => {
      const isAuthenticate = session.requireAuth();
      if (!isAuthenticate) return;
      toasterService.clear();
      booksStorage.setState({ currentBook: undefined });
      try {
        const response = await BookManagerService.create(book);
        if (response.status) {
          booksStorage.setState({ currentBook: response.data });
          router.push('/');
        } else {
          toasterService.error(response.message);
        }
      } catch (error) {
        toasterService.error(error);
      }
    },
    find: async (id: string) => {
      booksStorage.setState({ currentBook: undefined });
      toasterService.clear();
      try {
        const response = await BookManagerService.find(id);
        if (response.status) {
          booksStorage.setState({ currentBook: response.data });
        } else {
          toasterService.error(response.message);
        }
      } catch (error) {
        toasterService.error(error);
      }
    },
    update: async (book: BookType) => {
      const isAuthenticate = session.requireAuth();
      if (!isAuthenticate) return;
      toasterService.clear();
      booksStorage.setState({ currentBook: undefined });
      try {
        const response = await BookManagerService.update(book);
        if (response.status) {
          booksStorage.setState({ currentBook: response.data });
          toasterService.success(response.message, true);
          router.push('/');
        } else {
          toasterService.error(response.message);
        }
      } catch (error) {
        toasterService.error(error);
      }
    },
    delete: async (book: BookType | undefined) => {
      const isAuthenticate = session.requireAuth();
      if (!isAuthenticate) return;
      toasterService.clear();
      if (book === undefined) {
        toasterService.error('Not Found');
        return;
      }
      try {
        const response = await BookManagerService.delete(book);
        if (response.status) {
          booksStorage.setState({ currentBook: undefined });
          toasterService.success(response.message, true);
          router.push('/');
        } else {
          toasterService.error(response.message);
        }
      } catch (error) {
        toasterService.error(error);
      }
    },
  };
}
