import { missingParamError } from '../../../shared/errors/missingParamsError';
import { UserModel } from '../domain/models/UserModel';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { Encrypter } from '../presentation/Encrypter';
import { UserValidator } from '../presentation/UserValidator';

export class AddUser {
  constructor(
    private userValidator: UserValidator,
    private encrypter: Encrypter
  ) {}

  async add(requestBody: UserCreateModel): Promise<UserModel> {
    const { error, isValid } = this.userValidator.validator(requestBody);

    if (!isValid) {
      const missing = missingParamError(error);
      throw missing;
    }

    const hashedPassword = this.encrypter.encrypt(requestBody.password);

    return { email: '', password: '', role: 'admin', username: '' };
  }
}
