import {
  EncrypterTest,
  UserRepositoryTest,
  UserValidatorTest,
  addUserData,
  user,
} from './factory/fakeData';
import { UserModel } from '../src/modules/user/domain/models/UserModel';
import { UpdateUser } from '../src/modules/user/Service/UpdateUser';

describe('AddUser', () => {
  const userValidator = new UserValidatorTest();
  const encrypter = new EncrypterTest();
  const userRepo = new UserRepositoryTest();

  const userId = 1;

  const updateUser = new UpdateUser(userValidator, encrypter, userRepo);

  test('Should call user validator', async () => {
    const spyValidator = jest.spyOn(userValidator, 'validator');

    await updateUser.update(addUserData, userId);

    expect(spyValidator).toHaveBeenCalledWith(addUserData);
  });

  test('Should throw an error when request data is invalid', async () => {
    const errorData = {
      status: 400,
      message: 'Invalid or missing param was sent',
      error: 'fields',
    };

    jest.spyOn(userValidator, 'validator').mockReturnValueOnce({ error: 'fields', isValid: false });

    await expect(() => updateUser.update(addUserData, userId)).rejects.toEqual(errorData);
  });

  test('Should call encrypter with password', async () => {
    const spyEncrypter = jest.spyOn(encrypter, 'encrypt');

    await updateUser.update(addUserData, userId);

    expect(spyEncrypter).toHaveBeenCalledWith(addUserData.password);
  });

  test('Should call user repository with correct values', async () => {
    const spyEncrypter = jest.spyOn(userRepo, 'update');

    await updateUser.update(addUserData, userId);

    const { passwordConfirm, ...rest } = addUserData;

    const userData: UserModel = {
      ...rest,
      password: 'hashed-value',
    };

    expect(spyEncrypter).toHaveBeenCalledWith(userData, userId);
  });
});
