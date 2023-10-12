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
  BookResponseType,
  BookType,
  SearchConditionType,
  defaultSearchCondition,
} from '../_types';
import {
  BooksPagingType,
  defaultBooksPaging,
} from '../_types/book/BooksPagingType';
import BookManagerService from '../_services/BookManagerService';

type BooksContextProps = {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  searchCondition: SearchConditionType;
  setSearchCondition: Dispatch<SetStateAction<SearchConditionType>>;
  books: BookType[];
  setBooks: Dispatch<SetStateAction<BookType[]>>;
  paging: BooksPagingType;
  filterBooks: (searchCondition: SearchConditionType) => void;
  refresh: () => void;
  createBook: (book: BookType) => Promise<BookResponseType | undefined>;
  isShowCreateForm: boolean;
  showCreateForm: () => void;
  hideCreateForm: () => void;
};

const BooksContext = createContext<BooksContextProps>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
  searchCondition: defaultSearchCondition,
  setSearchCondition: () => {},
  books: [],
  setBooks: () => {},
  paging: defaultBooksPaging,
  filterBooks: async () => {},
  refresh: () => {},
  createBook: async () => undefined,
  isShowCreateForm: false,
  showCreateForm: () => {},
  hideCreateForm: () => {},
});

export const BooksProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchCondition, setSearchCondition] = useState<SearchConditionType>(
    defaultSearchCondition,
  );
  const [books, setBooks] = useState<BookType[]>([]);
  const [paging, setPaging] = useState<BooksPagingType>(defaultBooksPaging);
  const [isShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);

  const filterBooks = async (newSearchCondition: SearchConditionType) => {
    showLoading();
    const response = await BookManagerService.getList(newSearchCondition);
    if (response.status) {
      const { books, page, perPage, total, totalPages } = response.data;
      setBooks(books);
      setPaging({ page, perPage, total, totalPages });
    }
    hideLoading();
  };

  const getSearchTermFromStorage = async () => {
    if (typeof localStorage === 'undefined') return '';
    const savedTerm = await localStorage.getItem('searchTerm');
    return savedTerm || '';
  };

  const saveSearchTermToStorage = async (term: string) => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('searchTerm', term);
  };

  const searchParams = useSearchParams();

  const initSearchCondition = async (): Promise<SearchConditionType> => {
    const parsedPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
    const parsedTerm = searchParams?.get('term') || '';
    const curTerm =
      parsedTerm === '' ? await getSearchTermFromStorage() : parsedTerm;
    return {
      ...searchCondition,
      page: parsedPage,
      term: curTerm,
    };
  };

  useEffect(() => {
    const updateSearchTerm = async () => {
      const currentSearchCondition = await initSearchCondition();
      if (
        currentSearchCondition.term !== searchCondition.term ||
        currentSearchCondition.page !== searchCondition.page
      )
        setSearchCondition(currentSearchCondition);
      saveSearchTermToStorage(currentSearchCondition.term);
    };

    updateSearchTerm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const refresh = async () => {
    await filterBooks(searchCondition);
  };

  const createBook = async (book: BookType) => {
    showLoading();
    const response = await BookManagerService.create(book);
    hideLoading();
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
      paging,
      filterBooks,
      refresh,
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
