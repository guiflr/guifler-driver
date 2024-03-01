import { UserCreateModel } from '../domain/useCases/UserCreate';
import { AddUserSchema } from '../helpers/AddUserSchema';
import { UpdateUserSchema } from '../helpers/UpdateUserSchema';
import { UserValidator, UserValidatorResponse } from '../presentation/UserValidator';

export class UpdateUserValidatorAdapter implements UserValidator {
  validator(user: UserCreateModel): UserValidatorResponse {
    const validation = UpdateUserSchema.safeParse(user);

    if (validation.success) {
      return { error: '', isValid: true };
    }

    const error = JSON.stringify(validation.error);

    return { isValid: false, error };
  }
}
