import z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must have more than 6 characters')
    .max(20, 'Password must have less than 20 letters'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
