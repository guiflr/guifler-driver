import { z } from 'zod';

export const AddDocumentSchema = z.object({
  name: z.string({ required_error: 'name required' }),
  type: z.enum(['file', 'folder']),
  owner_id: z.number({ invalid_type_error: 'owner_id is on invalid type' }).nullable(),
});
