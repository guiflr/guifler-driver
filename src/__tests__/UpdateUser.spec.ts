import {
  EncrypterTest,
  UserRepositoryTest,
  UserValidatorTest,
  addUserData,
  user,
} from './factory/fakeData';
import { UpdateUserModel, UserModel } from '../modules/user/domain/models/UserModel';
import { UpdateUser } from '../modules/user/Service/UpdateUser';

describe('AddUser', () => {
  const userValidator = new UserValidatorTest();
  const userRepo = new UserRepositoryTest();

  const userId = 1;

  const updateUser = new UpdateUser(userValidator, userRepo);

  test('Should call user validator', async () => {
    const spyValidator = jest.spyOn(userValidator, 'validator');

    await updateUser.update(addUserData, userId);

    expect(spyValidator).toHaveBeenCalledWith(addUserData);
  });

  test('Should throw an error when request data is invalid', async () => {
    const errorData = {
      status: 400,
      message: 'Invalid or missing param',
      error: 'fields',
    };

    jest.spyOn(userValidator, 'validator').mockReturnValueOnce({ error: 'fields', isValid: false });

    await expect(() => updateUser.update(addUserData, userId)).rejects.toEqual(errorData);
  });

  test('Should call user repository with correct values', async () => {
    const userRepoSpy = jest.spyOn(userRepo, 'update');

    await updateUser.update(addUserData, userId);

    const { passwordConfirm, password, ...rest } = addUserData;

    const userData: UpdateUserModel = {
      ...rest,
    };

    expect(userRepoSpy).toHaveBeenCalledWith(userData, userId);
  });
});
