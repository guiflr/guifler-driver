import { UserValidatorAdapter } from '../modules/user/adapters/UserValidatorAdapter';
import { UserCreateModel } from '../modules/user/domain/useCases/UserCreate';
import { addUserData } from './factory/fakeData';

describe('UserValidatorAdapter', () => {
  const validator = new UserValidatorAdapter();
  test('Should return error', () => {
    const data: UserCreateModel = {} as unknown as UserCreateModel;

    const response = validator.validator(data);

    expect(response.isValid).toBe(false);
    expect(response.error).toEqual([
      'email is required',
      'username is required',
      'role is required',
      'password is required',
      'passwordConfirm is required',
    ]);
  });

  test('Should return password confirm error', () => {
    const data: UserCreateModel = {
      email: 'guilherme@gmail.com',
      password: 'abc123',
      passwordConfirm: '123abc',
      role: 'admin',
      username: 'gui',
    };

    const response = validator.validator(data);

    expect(response.error).toEqual(['password and password confirmation is not equal']);
  });

  test('Should return valid schema', () => {
    const response = validator.validator(addUserData);

    expect(response.isValid).toBe(true);
  });
});
