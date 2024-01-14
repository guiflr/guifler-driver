import { z } from 'zod';

export const AddUserSchema = z
  .object({
    email: z.string().email({ message: 'email is invalid' }),
    username: z.string({ required_error: 'username is required' }),
    role: z.enum(['admin', 'creator', 'guest'], {
      required_error: 'role is required',
      invalid_type_error: 'role should be admin, creator or guest',
    }),
    password: z
      .string({ required_error: 'password is required' })
      .min(6, { message: 'password has less than six character' }),
    passwordConfirm: z
      .string({ required_error: 'password is required' })
      .min(6, { message: 'password has less than six character' }),
  })
  .superRefine((fields, ctx) => {
    if (fields.password !== fields.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'password and password confirmation is not equal',
      });
    }
  });
