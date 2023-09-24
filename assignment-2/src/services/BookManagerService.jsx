class BookManagerService {
  constructor() {
    this.storageKey = "books";
    this.db = localStorage;
  }

  getBooksFromStorage() {
    const storedBooks = this.db.getItem(this.storageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  saveBooksToStorage(books) {
    this.db.setItem(this.storageKey, JSON.stringify(books));
  }

  generateUniqueID() {
    return Math.floor(Math.random() * Date.now()).toString(16);
  }

  getList(condition) {
    const storedBooks = this.getBooksFromStorage();
    const filteredBooks = storedBooks.filter((book) =>
      book.title.toLowerCase().includes(condition.term.toLowerCase())
    );
    const totalBooks = filteredBooks.length;
    const totalPages = Math.ceil(totalBooks / condition.perPage);
    const startIndex = (condition.page - 1) * condition.perPage;
    const endIndex = startIndex + condition.perPage;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    return {
      searchTerm: condition.term,
      page: condition.page,
      perPage: condition.perPage,
      total: totalBooks,
      totalPages: totalPages,
      data: paginatedBooks,
    };
  }

  create(book) {
    const storedBooks = this.getBooksFromStorage();
    const newBook = {
      ...book,
      createAt: Date.now(),
      id: this.generateUniqueID()
    };
    storedBooks.push(newBook);
    this.saveBooksToStorage(storedBooks);
    return {
      status: true,
      data: newBook,
    };
  }

  delete(book) {
    const storedBooks = this.getBooksFromStorage();
    const updatedBooks = storedBooks.filter((item) => item.id !== book.id);
    this.saveBooksToStorage(updatedBooks);
    return true;
  }
}

const instance = new BookManagerService();
export default instance;