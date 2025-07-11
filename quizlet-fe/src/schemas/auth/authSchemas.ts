import { z } from 'zod';

export const loginSchemas = z.object({
  email: z
    .string()
    .nonempty('Your email cannot be empty')
    .min(5, 'Your email must be at least 5 characters')
    .max(150, 'Your email cannot be larger than 150 characters')
    .email('Invalid email address'),
  password: z
    .string()
    .nonempty('Your password cannot be empty')
    .min(5, 'Your password must be at least 5 characters')
    .max(150, 'Your password cannot be larger than 150 characters'),
});

export const registerSchemas = z
  .object({
    email: z
      .string()
      .nonempty('Your email cannot be empty')
      .min(5, 'Your email must be at least 5 characters')
      .max(150, 'Your email cannot be larger than 150 characters')
      .email('Invalid email address'),
    password: z
      .string()
      .nonempty('Your password cannot be empty')
      .min(5, 'Your password must be at least 5 characters')
      .max(150, 'Your password cannot be larger than 150 characters'),
      fullName: z
      .string()
      .min(3, 'Your name is invalid')
      .max(150, 'Your name is invalid')
      .nonempty('Your name cannot be empty')
      .optional(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Password must match',
      path: ['confirmPassword'],
    }
  );

export type FormLoginValues = z.infer<typeof loginSchemas>;
export type FormRegisterValues = z.infer<typeof registerSchemas>;
