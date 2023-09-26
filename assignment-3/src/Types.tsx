interface BooksType {
  searchTerm: SearchTermType;
  total: number;
  totalPages: number;
  data: BookType[];
}

interface BookType {
  id: string;
  createdAt: number;
  title: string;
  author: string;
  topic: string;
}

interface SearchTermType {
  page: number;
  perPage: number;
  term: String;
}

interface CreateFormStateType {
  isShow: boolean;
  book: BookType | null;
}

interface DeleteFormStateType {
  isShow: boolean;
  book: BookType | null;
}

interface CreateBookResponseType {
  status: boolean;
  data: BookType;
}

interface DeleteBookResponseType {
  status: boolean;
}

export type {
  BooksType,
  BookType,
  SearchTermType,
  CreateFormStateType,
  DeleteFormStateType,
  CreateBookResponseType,
  DeleteBookResponseType,
};
