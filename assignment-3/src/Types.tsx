interface BooksType {
  searchTerm: SearchTermType
  total: number
  totalPages: number
  data: BookType[]
}

interface BookType {
  id?: string
  createdAt?: number
  title: string
  author: string
  topic: string
}

interface SearchTermType {
  page: number
  perPage: number
  Term: String
}

export type { BooksType, BookType, SearchTermType }
