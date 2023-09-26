import {
  BookType,
  BooksType,
  CreateBookResponseType,
  SearchTermType,
} from '../Types';

class BookManagerService {
  private storageKey: string;
  private db: Storage;

  constructor() {
    this.storageKey = 'books';
    this.db = localStorage;
  }

  private getBooksFromStorage(): BookType[] {
    const storedBooks = this.db.getItem(this.storageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  private saveBooksToStorage(books: BookType[]): void {
    this.db.setItem(this.storageKey, JSON.stringify(books));
  }

  public getList(condition: SearchTermType): BooksType {
    const storedBooks = this.getBooksFromStorage();
    const filteredBooks = storedBooks.filter((book) =>
      book.title.toLowerCase().includes(condition.term.toLowerCase()),
    );
    const totalBooks = filteredBooks.length;
    const totalPages = Math.ceil(totalBooks / condition.perPage);
    const startIndex = (condition.page - 1) * condition.perPage;
    const endIndex = startIndex + condition.perPage;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    return {
      searchTerm: condition,
      total: totalBooks,
      totalPages,
      data: paginatedBooks,
    };
  }

  public create(book: BookType): CreateBookResponseType {
    const storedBooks = this.getBooksFromStorage();
    const newBook: BookType = {
      ...book,
      createdAt: Date.now(),
      id: Math.floor(Math.random() * Date.now()).toString(16),
    };
    storedBooks.push(newBook);
    this.saveBooksToStorage(storedBooks);
    return {
      status: true,
      data: newBook,
    };
  }

  public delete(book: BookType): boolean {
    const storedBooks = this.getBooksFromStorage();
    const updatedBooks = storedBooks.filter((item) => item.id !== book.id);
    this.saveBooksToStorage(updatedBooks);
    return true;
  }
}

const instance = new BookManagerService();
export default instance;
