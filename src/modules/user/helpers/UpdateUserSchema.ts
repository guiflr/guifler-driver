import { z } from 'zod';

export const UpdateUserSchema = z.object({
  email: z.string().email({ message: 'email is invalid' }),
  username: z.string({ required_error: 'username is required' }),
  role: z.enum(['admin', 'creator', 'guest'], {
    required_error: 'role is required',
    invalid_type_error: 'role should be admin, creator or guest',
  }),
});
