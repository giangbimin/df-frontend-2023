import { z } from 'zod';
import { validTopics } from '../book/BookType';

export const BookSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must have at least 5 characters')
    .max(20, 'Title must have less than 20 letters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(20, 'Author must have less than 20 letters')
    .refine((author) => /^[A-Za-z ]+$/.test(author), {
      message: 'Author name can only contain letters and spaces',
    }),
  topic: z
    .string()
    .min(1, 'Topic is required')
    .refine((topic) => validTopics.includes(topic), {
      message: 'Must select from available options',
    }),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
