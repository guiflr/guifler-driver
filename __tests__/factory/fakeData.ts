import { UserCreateModel } from '../../src/modules/user/domain/useCases/UserCreate';
import {
  UserValidator,
  UserValidatorResponse,
} from '../../src/modules/user/presentation/UserValidator';

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
