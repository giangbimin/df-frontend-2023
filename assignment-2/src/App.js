import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import FormCreate from "./components/FormCreate";
import FormDelete from "./components/FormDelete";
import BookList from "./components/BookList";
import BookManagerService from "./services/BookManagerService";
import { DeleteBookFormContext } from "./contexts/DeleteBookFormContext";
import Pagination from "./components/Pagination";
;

const App = () => {
  const [theme, setTheme] = useState("light");
  const [bookStore, setBookStore] = useState({ page: 1, totalPages: 0, books: []});
  const [searchTerm, setSearchTerm] = useState({ term: "", page: 1, perPage: 5 });
  const [formCreate, setCreateForm] = useState({ isShow: false, book: null });
  const [formDelete, setDeleteForm] = useState({ isShow: false, book: null });

  const toggleTheme = () => {
    setTheme((themeName) => (themeName === "light" ? "dark" : "light"));
  }

  const setNewSearchTerm = (newTerm, newPage, newPerPage) => {
    setSearchTerm((prevSearchTerm) => ({
      term: newTerm !== null ? newTerm : prevSearchTerm.term,
      page: newPage !== null ? newPage : prevSearchTerm.page,
      perPage: newPerPage !== null ? newPerPage : prevSearchTerm.perPage,
    }));
  }

  const showCreateForm = () => {
    setCreateForm({ isShow: true, book: null});
  }

  const closeCreateForm = () => {
    setCreateForm({ isShow: false, book: null });
  }

  const showDeleteForm = (book) => {
    setDeleteForm({ isShow: true, book: book });
  }

  const closeDeleteForm = () => {
    setDeleteForm({ isShow: false, book: null });
  };

  const addBook = (book) => {
    BookManagerService.create(book);
    searchBook(searchTerm);
  };

  const deleteBook = (book) => {
    BookManagerService.delete(book)
    searchBook(searchTerm)
  }

  const onTermChange = (newTerm) => {
    setNewSearchTerm(newTerm, null, null);
  };

    const onPageChange = (newPage) => {
      console.log(newPage, bookStore.totalPages);
      if (newPage > bookStore.totalPages || newPage < 1) return;
      setNewSearchTerm(null, newPage, null);
    };

  const searchBook = async (curSearchTerm) => {
    const result = BookManagerService.getList(curSearchTerm);
    setBookStore({ books: result.data, page: result.page, totalPages: result.totalPages});
  };

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
        {bookStore.totalPages > 1 ? (
          <Pagination bookStore={bookStore} onPageChange={onPageChange} />
        ) : null}
        {formDelete.isShow ? (
          <FormDelete
            formDelete={formDelete}
            closeDeleteForm={closeDeleteForm}
            deleteBook={deleteBook}
          />
        ) : null}
        {formCreate.isShow ? (
          <FormCreate closeCreateForm={closeCreateForm} addBook={addBook} />
        ) : null}
      </main>
    </div>
  );
};

export default App;
