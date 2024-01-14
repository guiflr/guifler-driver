import { UserValidatorAdapter } from '../src/modules/user/adapters/UserValidatorAdapter';
import { UserCreateModel } from '../src/modules/user/domain/useCases/UserCreate';
import { addUserData } from './factory/fakeData';

describe('UserValidatorAdapter', () => {
  const validator = new UserValidatorAdapter();
  test('Should return error', () => {
    const data: UserCreateModel = null as unknown as UserCreateModel;

    const response = validator.validator(data);

    expect(response.isValid).toBe(false);
    expect(response.error).toEqual(
      '{"issues":[{"code":"invalid_type","expected":"object","received":"null","path":[],"message":"Expected object, received null"}],"name":"ZodError"}'
    );
  });

  test('Should return valid schema', () => {
    const response = validator.validator(addUserData);

    expect(response.isValid).toBe(true);
  });
});
