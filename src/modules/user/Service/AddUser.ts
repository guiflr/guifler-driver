import { missingParamError } from '../../../shared/errors/missingParamsError';
import { UserModel } from '../domain/models/UserModel';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { UserValidator } from '../presentation/UserValidator';

export class AddUser {
  constructor(private userValidator: UserValidator) {}

  async add(requestBody: UserCreateModel): Promise<UserModel> {
    const { error, isValid } = this.userValidator.validator(requestBody);

    if (!isValid) {
      const missing = missingParamError(error);
      throw missing;
    }

    return { email: '', password: '', role: 'admin', username: '' };
  }
}
