import { z } from 'zod';

export const BookSchema = z.object({
  name: z
    .string()
    .min(5, 'Name must have at least 5 characters')
    .max(20, 'Name must have less than 20 letters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(20, 'Author must have less than 20 letters')
    .refine((author) => /^[A-Za-z ]+$/.test(author), {
      message: 'Author name can only contain letters and spaces',
    }),
  topicId: z.number().min(1, 'Please select Topic'),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
