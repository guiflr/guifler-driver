import { UserCreateModel } from '../../src/modules/user/domain/useCases/UserCreate';
import {
  UserValidator,
  UserValidatorResponse,
} from '../../src/modules/user/presentation/UserValidator';
import { Encrypter } from '../modules/user/presentation/Encrypter';

export const addUserData: UserCreateModel = {
  email: 'email@email.com',
  password: 'password',
  passwordConfirm: 'password',
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
