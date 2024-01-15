import { missingParamError } from '../../../shared/errors/missingParamsError';
import { UserModel } from '../domain/models/UserModel';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { Encrypter } from '../presentation/Encrypter';
import { UserValidator } from '../presentation/UserValidator';
import { UserRepository } from '../repositories/UserRepository';

export class UpdateUser {
  constructor(
    private userValidator: UserValidator,
    private encrypter: Encrypter,
    private userRepository: UserRepository
  ) {}

  async update(requestBody: UserCreateModel, userId: number): Promise<void> {
    const { error, isValid } = this.userValidator.validator(requestBody);

    if (!isValid) {
      const missing = missingParamError(error);
      throw missing;
    }

    const { email, password, role, username } = requestBody;

    const hashedPassword = await this.encrypter.encrypt(password);

    const userData: UserModel = {
      email,
      password: hashedPassword,
      role,
      username,
    };

    await this.userRepository.update(userData, userId);
  }
}
