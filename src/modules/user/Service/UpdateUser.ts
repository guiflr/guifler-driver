import { missingParamError } from '../../../shared/errors/missingParamsError';
import { UpdateUserModel, UserModel } from '../domain/models/UserModel';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { Encrypter } from '../presentation/Encrypter';
import { UserValidator } from '../presentation/UserValidator';
import { UserRepository } from '../repositories/UserRepository';

export class UpdateUser {
  constructor(
    private userValidator: UserValidator,  
    private userRepository: UserRepository
  ) {}

  async update(requestBody: UserCreateModel, userId: number): Promise<void> {
    const { error, isValid } = this.userValidator.validator(requestBody);

    if (!isValid) {
      const missing = missingParamError(error);
      throw missing;
    }

    const { email, role, username } = requestBody;

    const userData: UpdateUserModel = {
      email,     
      role,
      username,
    };

    await this.userRepository.update(userData, userId);
  }
}
