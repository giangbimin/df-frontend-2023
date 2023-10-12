import { z } from 'zod';
import { validTopics } from '../book/BookType';

export const BookSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(20, 'Title must have less than 20 letters'),
    author: z
      .string()
      .min(1, 'Author is required')
      .max(20, 'Author must have less than 20 letters'),
    topic: z.string().min(1, 'Topic is required'),
  })
  .refine((data) => validTopics.includes(data.topic), {
    path: ['topic'],
    message: "Topic doesn't allowed",
  });

export type BookSchemaType = z.infer<typeof BookSchema>;
