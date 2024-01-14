import { UserCreateModel } from '../domain/useCases/UserCreate';
import { AddUserSchema } from '../helpers/AddUserSchema';
import { UserValidator, UserValidatorResponse } from '../presentation/UserValidator';

export class UserValidatorAdapter implements UserValidator {
  validator(user: UserCreateModel): UserValidatorResponse {
    const validation = AddUserSchema.safeParse(user);

    if (validation.success) {
      return { error: '', isValid: true };
    }

    const error = JSON.stringify(validation.error);

    return { isValid: false, error };
  }
}
