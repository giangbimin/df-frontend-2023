import z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters')
    .max(20, 'Password must have less than 20 letters'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
