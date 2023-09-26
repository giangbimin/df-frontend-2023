import { createContext } from 'react'
import { BookType } from '../Types'

export const DeleteBookFormContext = createContext<
  ((book: BookType) => void) | null
>(null)
