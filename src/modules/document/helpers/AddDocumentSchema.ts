import { z } from 'zod';

export const AddDocumentSchema = z.object({
  name: z.string({ required_error: 'name required' }),
  type: z.enum(['file', 'folder']),
  owner_id: z.number({ invalid_type_error: 'owner_id is on invalid type' }).nullable(),
  user_id: z.number({
    invalid_type_error: 'user_id is on invalid type',
    required_error: 'user id is required',
  }),
});
