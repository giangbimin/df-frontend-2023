export const validTopics = [
  'Programming',
  'Database',
  'DepOps',
  'FrontEnd',
  'BackEnd',
];

interface BookType {
  id: string;
  createdAt: number;
  title: string;
  author: string;
  topic: string;
}

export const defaultBook: BookType = {
  id: '',
  createdAt: 0,
  title: '',
  author: '',
  topic: '',
};

export type { BookType };
