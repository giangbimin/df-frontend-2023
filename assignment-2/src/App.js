import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import FormCreate from "./components/FormCreate";
import FormDelete from "./components/FormDelete";
import BookList from "./components/BookList";
import BookManagerService from "./services/BookManagerService";
import { DeleteBookFormContext } from "./contexts/DeleteBookFormContext";
import Pagination from "./components/Pagination";

const App = () => {
  // State variables
  const [theme, setTheme] = useState("light");
  const [bookStore, setBookStore] = useState({
    page: 1,
    totalPages: 0,
    books: [],
  });
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    page: 1,
    perPage: 5,
  });
  const [formCreate, setCreateForm] = useState({ isShow: false, book: null });
  const [formDelete, setDeleteForm] = useState({ isShow: false, book: null });

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Set new search term handler
  const setNewSearchTerm = (newTerm, newPage, newPerPage) => {
    setSearchTerm((prevSearchTerm) => ({
      term: newTerm !== null ? newTerm : prevSearchTerm.term,
      page: newPage !== null ? newPage : prevSearchTerm.page,
      perPage: newPerPage !== null ? newPerPage : prevSearchTerm.perPage,
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
  const showDeleteForm = (book) => {
    setDeleteForm({ isShow: true, book: book });
  };

  // Close delete form handler
  const closeDeleteForm = () => {
    setDeleteForm({ isShow: false, book: null });
  };

  // Add book handler
  const addBook = (book) => {
    BookManagerService.create(book);
    searchBook(searchTerm);
  };

  // Delete book handler
  const deleteBook = (book) => {
    BookManagerService.delete(book);
    searchBook(searchTerm);
  };

  // Handle search term change
  const onTermChange = (newTerm) => {
    setNewSearchTerm(newTerm, null, null);
  };

  // Handle page change
  const onPageChange = (newPage) => {
    if (newPage > bookStore.totalPages || newPage < 1) return;
    setNewSearchTerm(null, newPage, null);
  };

  // Search for books based on search term
  const searchBook = async (curSearchTerm) => {
    const result = BookManagerService.getList(curSearchTerm);
    setBookStore({
      books: result.data,
      page: result.page,
      totalPages: result.totalPages,
    });
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
          <BookList books={bookStore.books} />
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
