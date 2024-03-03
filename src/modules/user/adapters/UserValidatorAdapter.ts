import { AbstractValidator } from '../abstract/AbstractValidator';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { AddUserSchema } from '../helpers/AddUserSchema';
import { UserValidator, UserValidatorResponse } from '../presentation/UserValidator';

export class UserValidatorAdapter extends AbstractValidator {
  schema (data: any): { success: boolean; error: any } {
    const schema = AddUserSchema.safeParse(data);

    return { error: schema.success ? null : schema.error, success: schema.success };
  }
}
