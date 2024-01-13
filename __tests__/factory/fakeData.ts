import { UserCreateModel } from '../../src/modules/user/domain/useCases/UserCreate';
import {
  UserValidator,
  UserValidatorResponse,
} from '../../src/modules/user/presentation/UserValidator';
import { UserModel } from '../modules/user/domain/models/UserModel';
import { Encrypter } from '../modules/user/presentation/Encrypter';
import { UserDTO, UserRepository } from '../modules/user/repositories/UserRepository';

export const addUserData: UserCreateModel = {
  email: 'email@email.com',
  password: 'password',
  passwordConfirm: 'password',
  role: 'admin',
  username: 'user',
};

export const user: UserDTO = {
  email: 'email@email.com',
  id: 1,
  password: 'password',
  role: 'admin',
  username: 'user',
};

export class UserValidatorTest implements UserValidator {
  validator(user: UserCreateModel): UserValidatorResponse {
    return { error: '', isValid: true };
  }
}

export class EncrypterTest implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return 'hashed-value';
  }
}

export class UserRepositoryTest implements UserRepository {
  async store(data: UserModel): Promise<UserDTO> {
    return user;
  }
}
