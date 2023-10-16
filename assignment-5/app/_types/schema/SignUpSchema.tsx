import z from 'zod';

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters')
      .max(20, 'Password must have less than 20 letters')
      .refine((password) => /[a-z]/.test(password), {
        message: 'Password must contain at least 1 lower letter',
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least 1 uppercase letter',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: 'Password must contain at least 1 number',
      })
      .refine(
        (password) => /[!@#$%^&*()_+|~\-=[\]{};:'"<>,./?]+/.test(password),
        {
          message: 'Password must contain at least 1 special character',
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
