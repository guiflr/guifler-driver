import { getZodErrors } from '../../../shared/helpers/getZodErrors';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { UserValidator, UserValidatorResponse } from '../presentation/UserValidator';

export abstract class AbstractValidator implements UserValidator {
  validator (user: UserCreateModel): UserValidatorResponse {
    const validation = this.schema(user);

    if (validation.success) {
      return { error: '', isValid: true };
    }

    const error = JSON.stringify(validation.error);

    const fieldsError = getZodErrors(error);

    return { isValid: false, error: fieldsError };
  }

  abstract schema(data: any): { success: boolean; error: any };
}
