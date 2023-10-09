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
import { useAuthenticationService } from './UseAuthenticationService';

interface BookStoreStorage {
  currentBook: BookType | undefined;
  loading: boolean | false;
  bookResponse: BooksResponseType;
  searchCondition: SearchConditionType;
}

const initialState = {
  currentBook: undefined,
  bookResponse: defaultBookStore,
  searchCondition: defaultSearchCondition,
  loading: true,
};

const booksStorage = create<BookStoreStorage>(() => initialState);

interface BookStore extends BookStoreStorage {
  search: (newSearchCondition: SearchConditionType) => Promise<void>;
  create: (curBook: BookType, isRedirect: boolean | false) => Promise<boolean>;
  find: (id: string) => Promise<void>;
  update: (curBook: BookType) => Promise<boolean>;
  delete: (
    curBook: BookType | undefined,
    isRedirect: boolean | false,
  ) => Promise<boolean>;
}

export function useBookManagerService(): BookStore {
  const router = useRouter();
  const toasterService = useToasterService();
  const { currentBook, bookResponse, searchCondition, loading } =
    booksStorage();
  const session = useAuthenticationService();

  const search = async (newSearchCondition: SearchConditionType) => {
    booksStorage.setState({ loading: false });
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
    booksStorage.setState({ loading: false });
  };

  return {
    currentBook,
    bookResponse,
    searchCondition,
    loading,
    search,
    create: async (book: BookType, isRedirect: boolean | false) => {
      const isAuthenticate = session.requireAuth();
      if (!isAuthenticate) return false;
      toasterService.clear();
      booksStorage.setState({ currentBook: undefined, loading: true });
      try {
        const response = await BookManagerService.create(book);
        if (response.status) {
          booksStorage.setState({ currentBook: response.data });
          if (isRedirect) {
            router.push('/');
          } else {
            search(booksStorage.getState().searchCondition);
          }
        } else {
          toasterService.error(response.message);
        }
        booksStorage.setState({ loading: false });
        return response.status;
      } catch (error) {
        toasterService.error(error);
        booksStorage.setState({ loading: false });
        return false;
      }
    },
    find: async (id: string) => {
      booksStorage.setState({ currentBook: undefined, loading: true });
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
      booksStorage.setState({ loading: false });
    },
    update: async (book: BookType) => {
      const isAuthenticate = session.requireAuth();
      if (!isAuthenticate) return false;
      toasterService.clear();
      booksStorage.setState({ loading: true });
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
        booksStorage.setState({ loading: false });
        return response.status;
      } catch (error) {
        booksStorage.setState({ loading: false });
        toasterService.error(error);
        return false;
      }
    },
    delete: async (book: BookType | undefined, isRedirect: boolean | false) => {
      const isAuthenticate = session.requireAuth();
      if (!isAuthenticate) return false;
      toasterService.clear();
      if (book === undefined) {
        toasterService.error('Not Found');
        return false;
      }
      booksStorage.setState({ loading: true });
      try {
        const response = await BookManagerService.delete(book);
        if (response.status) {
          booksStorage.setState({ currentBook: undefined });
          toasterService.success(response.message, true);
          if (isRedirect) {
            router.push('/');
          } else {
            search(booksStorage.getState().searchCondition);
          }
        } else {
          toasterService.error(response.message);
        }
        booksStorage.setState({ loading: false });
        return response.status;
      } catch (error) {
        booksStorage.setState({ loading: false });
        toasterService.error(error);
        return false;
      }
    },
  };
}
