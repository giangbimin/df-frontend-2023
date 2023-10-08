import z from 'zod';

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
    passwordConfirmation: z
      .string()
      .min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
