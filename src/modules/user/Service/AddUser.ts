import { missingParamError } from '../../../shared/errors/missingParamsError';
import { UserModel } from '../domain/models/UserModel';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { Encrypter } from '../presentation/Encrypter';
import { UserValidator } from '../presentation/UserValidator';
import { UserDTO, UserRepository } from '../repositories/UserRepository';

export class AddUser {
  constructor(
    private userValidator: UserValidator,
    private encrypter: Encrypter,
    private userRepository: UserRepository
  ) {}

  async add(requestBody: UserCreateModel): Promise<UserDTO> {
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

    const user = await this.userRepository.store(userData);

    return user;
  }
}
