'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { useSearchParams } from 'next/navigation';
import {
  Book,
  BookPayload,
  ListBookPayload,
  defaultListBookPayload,
} from '../_types/api/book.d';
import { fetchWrapper } from '../_services/common/fetchWrapper';
import {
  defaultFetchResponse,
  defaultMetadata,
  FetchResponse,
  Metadata,
} from '../_types/api/request.d';

type BooksContextProps = {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  searchCondition: ListBookPayload;
  setSearchCondition: Dispatch<SetStateAction<ListBookPayload>>;
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
  filterBooks: (searchCondition: ListBookPayload) => void;
  paging: Metadata;
  createBook: (bookPayload: BookPayload) => Promise<FetchResponse>;
  isShowCreateForm: boolean;
  showCreateForm: () => void;
  hideCreateForm: () => void;
};

const BooksContext = createContext<BooksContextProps>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
  searchCondition: defaultListBookPayload,
  setSearchCondition: () => {},
  books: [],
  setBooks: () => {},
  filterBooks: async () => {},
  paging: defaultMetadata,
  createBook: async () => defaultFetchResponse,
  isShowCreateForm: false,
  showCreateForm: () => {},
  hideCreateForm: () => {},
});

export const BooksProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchCondition, setSearchCondition] = useState<ListBookPayload>(
    defaultListBookPayload,
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [paging, setPaging] = useState<Metadata>(defaultMetadata);
  const [isShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);

  const getSearchQueryFromStorage = async () => {
    if (typeof localStorage === 'undefined') return '';
    const savedQuery = await localStorage.getItem('query');
    return savedQuery || '';
  };

  const saveSearchQueryToStorage = async (query: string) => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('query', query);
  };

  const searchParams = useSearchParams();

  const initSearchCondition = async (): Promise<ListBookPayload> => {
    const parsedPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
    const parsedPageSize =
      parseInt(searchParams?.get('pageSize') ?? '5', 10) || 5;
    const parsedQuery = searchParams?.get('query') || '';
    const curQuery =
      parsedQuery === '' ? await getSearchQueryFromStorage() : parsedQuery;
    return {
      ...searchCondition,
      page: parsedPage,
      query: curQuery,
      pageSize: parsedPageSize,
    };
  };

  useEffect(() => {
    const updateSearchQuery = async () => {
      const currentSearchCondition = await initSearchCondition();
      if (
        currentSearchCondition.query !== searchCondition.query ||
        currentSearchCondition.page !== searchCondition.page ||
        currentSearchCondition.pageSize !== searchCondition.pageSize
      )
        setSearchCondition(currentSearchCondition);
      saveSearchQueryToStorage(currentSearchCondition.query || '');
    };

    updateSearchQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterBooks = async (searchCondition: ListBookPayload) => {
    const response = await fetchWrapper(
      `https://develop-api.bookstore.dwarvesf.com/api/v1/books`,
      'GET',
      searchCondition,
    );
    if (response.success) {
      setBooks(response.data as Book[]);
      if (response.metadata) setPaging(response.metadata);
    }
    hideLoading();
  };

  const createBook = async (bookPayload: BookPayload) => {
    const response = await fetchWrapper(
      `https://develop-api.bookstore.dwarvesf.com/api/v1/books`,
      'POST',
      bookPayload,
    );
    return response;
  };

  const showCreateForm = () => {
    setIsShowCreateForm(true);
  };

  const hideCreateForm = () => {
    setIsShowCreateForm(false);
  };

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const useBooksContext = useMemo<BooksContextProps>(
    () => ({
      loading,
      showLoading,
      hideLoading,
      searchCondition,
      setSearchCondition,
      books,
      setBooks,
      filterBooks,
      paging,
      createBook,
      isShowCreateForm,
      showCreateForm,
      hideCreateForm,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchCondition, isShowCreateForm, books, loading],
  );

  return (
    <BooksContext.Provider value={useBooksContext}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => useContext(BooksContext);
