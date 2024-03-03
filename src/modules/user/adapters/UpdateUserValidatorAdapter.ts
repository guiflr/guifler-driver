import { AbstractValidator } from '../abstract/AbstractValidator';
import { UpdateUserSchema } from '../helpers/UpdateUserSchema';

export class UpdateUserValidatorAdapter extends AbstractValidator {
  schema (data: any): { success: boolean; error: any } {
    const schema = UpdateUserSchema.safeParse(data);

    return { error: schema.success ? null : schema.error, success: schema.success };
  }
}
