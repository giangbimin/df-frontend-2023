import { z } from 'zod';

export const validTopics = [
  'Programming',
  'Database',
  'DepOps',
  'FrontEnd',
  'BackEnd',
] as const;

export const BookSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(20, 'Title must have less than 20 letters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(20, 'Author must have less than 20 letters'),
  topic: z
    .enum([...validTopics])
    .optional()
    .refine(
      (value) => {
        return validTopics.includes(value as (typeof validTopics)[number]);
      },
      {
        message: 'topic is required and in the List',
      },
    ),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
