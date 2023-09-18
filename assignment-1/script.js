class Book {
  constructor(title, author, topic) {
    this.id = this._generateUniqueID();
    this.created_at = Date.now();
    this.title = title;
    this.author = author;
    this.topic = topic;
    this.isRendered = false;
  }

  _generateUniqueID() {
    return Math.floor(Math.random() * Date.now()).toString(16);
  }
}

const BOOK_TEMPLATE = document.getElementById("book-template").innerHTML;
class BookComponent {
  constructor(book) {
    this.book = book;
  }

  render() {
    const bookHTML = BOOK_TEMPLATE.replace("{{id}}", this.book.id)
      .replace("{{title}}", this.book.title)
      .replace("{{author}}", this.book.author)
      .replace("{{topic}}", this.book.topic);
    const row = document.createElement("tr");
    row.id = this.id;
    row.innerHTML = bookHTML;
    this.book.isRendered = true;
    return row;
  }
}

class BookStoreRepo {
  constructor() {
    this.db = localStorage;
  }

  load() {
    const storedBooks = JSON.parse(this.db.getItem("books")) || [];
    return this._transform(storedBooks);
  }

  save(books) {
    this.db.setItem("books", this._toJson(books));
  }

  _transform(storedBooks) {
    return storedBooks.map((bookData) => this._fromJson(bookData));
  }

  _toJson(books) {
    return JSON.stringify(books);
  }

  _fromJson (bookData) {
    return new Book(bookData.title, bookData.author, bookData.topic);
  }
}

class BookStore {
  constructor() {
    this.db = new BookStoreRepo();
    this.books = [];
    this.filteredBooks = this.books;
  }

  reset() {
    this.books = this.db.load();
    this.filteredBooks = this.books;
  }

  addBook(newBook) {
    this.books.push(newBook);
    this.db.save(this.books);
  }

  searchBook(searchTerm) {
    if (searchTerm == "") {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  findByBookId(id) {
    return this.books.find((book) => book.id == id);
  }

  deleteBook(book) {
    this.books = this.books.filter((item) => item.id !== book.id);
    this.db.save(this.books);
  }
}

class BookStoreComponent {
  constructor(bookStore) {
    this.bookStore = bookStore;
    this.table = document.getElementById("book-table");
    this.searchTerm = "";
  }

  render() {
    this.bookStore.searchBook(this.searchTerm);
    this._cleanTable();
    for (const book of this.bookStore.filteredBooks) {
      this._appendChid(book);
    }
  }

  addBook(book) {
    this.bookStore.addBook(book);
    this.render();
  }

  deleteBook(book) {
    this.bookStore.deleteBook(book);
    this.render();
  }

  searchBook(searchTerm) {
    this.searchTerm = searchTerm;
    this.render();
  }

  _appendChid(book) {
    const bookComponent = new BookComponent(book);
    this.table.appendChild(bookComponent.render());
  }

  _cleanTable() {
    this.table.innerHTML = "";
  }
}

class CreateBookComponent {
  constructor() {
    this.modal = document.getElementById("add-book-modal");
    this.titleElement = document.getElementById("title");
    this.authorElement = document.getElementById("author");
    this.topicElement = document.getElementById("topic");
    this.book = null;
  }

  open() {
    this._reset();
    this._showModal();
  }

  close() {
    this._reset();
    this._hideModal();
  }

  submit() {
    if (title.value && author.value && topic.value) {
      this.book = new Book(title.value, author.value, topic.value);
      this.close();
    } else {
      alert("Please fill in all fields.");
    }
  }

  _reset() {
    this.titleElement.value = "";
    this.authorElement.value = "";
    this.topicElement.value = "";
  }

  _showModal() {
    this.modal.style.display = "block";
  }

  _hideModal() {
    this.modal.style.display = "none";
  }
}

class DeleteBookComponent {
  constructor(book) {
    this.book = book;
    this.modal = document.getElementById("delete-book-modal");
    this.bookTitle = document.getElementById("book-name");
  }

  open() {
    this._showModal();
  }

  close() {
    this._reset();
    this._hideModal();
  }

  submit() {
    this._hideModal();
    return this.book;
  }

  _reset() {
    this.book = null;
    this.bookTitle.innerHTML = "";
  }

  _showModal() {
    this.bookTitle.innerHTML = this.book.title;
    this.modal.style.display = "block";
  }

  _hideModal() {
    this.modal.style.display = "none";
  }
}

class SearchComponent {
  constructor() {
    this.input = document.getElementById("search-input");
    this.searchTerm = "";
  }

  submit() {
    this.searchTerm = this.input.value;
  }
}

class MyAppController {
  constructor() {
    this.bookStore = new BookStore();
    this.booksComponent = new BookStoreComponent(this.bookStore);
    this.createForm = new CreateBookComponent();
    this.searchForm = new SearchComponent();
    this.deleteForm = null;
  }

  start() {
    this.bookStore.reset();
    this.booksComponent.render();
  }

  handleSearchBook() {
    this.searchForm.submit();
    this.booksComponent.searchBook(this.searchForm.searchTerm);
  }

  openAddBookModal() {
    this.createForm.open();
  }

  closeAddBookModal() {
    this.createForm.close();
  }

  handleAddBook() {
    this.createForm.submit();
    this.booksComponent.addBook(this.createForm.book);
  }

  openDeleteBookModal(id) {
    const book = this.bookStore.findByBookId(id);
    this.deleteForm = new DeleteBookComponent(book);
    this.deleteForm.open();
  }

  closeDeleteBookModal() {
    this.deleteForm.close();
  }

  handleDeleteBook() {
    const book = this.deleteForm.book;
    this.deleteForm.close();
    this.booksComponent.deleteBook(book);
  }
}
