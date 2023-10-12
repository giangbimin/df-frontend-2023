import z from 'zod';

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters')
      .max(20, 'Password must have less than 20 letters')
      .refine((password) => /[A-Z]/.test(password), {
        path: ['password'],
        message: 'Password must contain at least 1 uppercase letter',
      })
      .refine(
        (password) => /[!@#$%^&*()_+|~\- =\[\]{};':"\\<>,./?]+/.test(password),
        {
          path: ['password'],
          message: 'Password must contain at least 1 symbol',
        },
      ),
    passwordConfirmation: z
      .string()
      .min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
