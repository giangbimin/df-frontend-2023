import { FC, useEffect, useState } from 'react';
import { BookType, BooksType, CreateFormStateType, DeleteFormStateType, SearchTermType } from './Types';
import BookManagerService from './services/BookManagerService';
import BookList from './components/BookList';
import Navbar from './components/Narbar';
import Header from './components/Header';
import { DeleteBookFormContext } from './contexts/DeleteBookFormContext';
import Pagination from './components/Pagination';
import FormDelete from './components/FormDelete';
import FormCreate from './components/FormCreate';


const defaultSearchTermState: SearchTermType = {
  page: 1,
  perPage: 5,
  term: '',
};

const defaultBooksState: BooksType = {
  searchTerm: defaultSearchTermState,
  total: 0,
  totalPages: 0,
  data: [],
};

const defaultFormCreateState: CreateFormStateType = {
  isShow: false, book: null,
};

const defaultFormDeleteState: DeleteFormStateType = {
  isShow: false, book: null,
};

const App: FC = () => {
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState<SearchTermType>(defaultSearchTermState);
  const [bookStore, setBookStore] = useState<BooksType>(defaultBooksState);
  const [formCreate, setCreateForm] = useState<CreateFormStateType>(defaultFormCreateState);
  const [formDelete, setDeleteForm] = useState<DeleteFormStateType>(defaultFormDeleteState);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Set new search term handler
  const setNewSearchTerm = (
    newTerm?: string,
    newPage?: number,
    newPerPage?: number,
  ) => {
    setSearchTerm((prevSearchTerm: SearchTermType) => ({
      term: newTerm !== undefined ? newTerm : prevSearchTerm.term,
      page: newPage !== undefined ? newPage : prevSearchTerm.page,
      perPage: newPerPage !== undefined ? newPerPage : prevSearchTerm.perPage,
    }));
  };

  // Show create form handler
  const showCreateForm = () => {
    setCreateForm({ isShow: true, book: null });
  };

  // Close create form handler
  const closeCreateForm = () => {
    setCreateForm({ isShow: false, book: null });
  };

  // Show delete form handler
  const showDeleteForm = (book: BookType) => {
    setDeleteForm({ isShow: true, book });
  };

  // Close delete form handler
  const closeDeleteForm = () => {
    setDeleteForm({ isShow: false, book: null });
  };

  // Add book handler
  const addBook = (book: BookType) => {
    BookManagerService.create(book);
    searchBook(searchTerm);
  };

  // Delete book handler
  const deleteBook = (book: BookType | null) => {
    if (book == null){ return; }
    BookManagerService.delete(book);
    searchBook(searchTerm);
  };

  // Handle search term change
  const onTermChange = (newTerm: string) => {
    setNewSearchTerm(newTerm, undefined, undefined);
  };

  // Handle page change
  const onPageChange = (newPage: number) => {
    if (newPage > bookStore.totalPages || newPage < 1) return;
    setNewSearchTerm(undefined, newPage, undefined);
  };

  // Search for books based on search term
  const searchBook = async (curSearchTerm: SearchTermType) => {
    const result = BookManagerService.getList(curSearchTerm);
    setBookStore(result);
  };

  // Effect to initiate search on component mount and when search term changes
  useEffect(() => {
    searchBook(searchTerm);
  }, [searchTerm]);

  return (
    <div id="book-store" className={theme}>
      <header>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main>
        <Header onTermChange={onTermChange} showCreateForm={showCreateForm} />
        <DeleteBookFormContext.Provider value={showDeleteForm}>
          <BookList books={bookStore.data} />
        </DeleteBookFormContext.Provider>
        {bookStore.totalPages > 1 && (
          <Pagination bookStore={bookStore} onPageChange={onPageChange} />
        )}
        {formDelete.isShow && (
          <FormDelete
            formDelete={formDelete}
            closeDeleteForm={closeDeleteForm}
            deleteBook={deleteBook}
          />
        )}
        {formCreate.isShow && (
          <FormCreate closeCreateForm={closeCreateForm} addBook={addBook} />
        )}
      </main>
    </div>
  );
};

export default App;