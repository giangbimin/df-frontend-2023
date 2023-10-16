import { SuccessMessageResponse, SuccessResponse } from './request.d';
import { Topic } from './topic.d';

interface Book {
  author: string;
  id: number;
  name: string;
  topic: Topic;
}

export const defaultBookPayload: BookPayload = {
  author: '',
  name: '',
  TopicID: 0,
};

interface BookPayload {
  author: string;
  name: string;
  TopicID: number;
}

interface ListBookPayload {
  page?: number;
  pageSize?: number;
  sort?: string;
  query?: string;
  TopicID?: number;
}

export const defaultListBookPayload: ListBookPayload = {
  page: 1,
  query: '',
  pageSize: 5,
};

type BookResponse = SuccessResponse<Book>;

type ListBookResponse = SuccessResponse<Book[]>;

type DeleteBookResponse = SuccessMessageResponse;

export type {
  Book,
  ListBookPayload,
  BookResponse,
  ListBookResponse,
  BookPayload,
  DeleteBookResponse,
};
