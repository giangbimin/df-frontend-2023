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

export type { BookType };
