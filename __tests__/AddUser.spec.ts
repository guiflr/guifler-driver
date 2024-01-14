import { AddUser } from './modules/user/service/AddUser';
import {
  EncrypterTest,
  UserRepositoryTest,
  UserValidatorTest,
  addUserData,
  user,
} from './factory/fakeData';
import { UserModel } from './modules/user/domain/models/UserModel';

describe('AddUser', () => {
  const userValidator = new UserValidatorTest();
  const encrypter = new EncrypterTest();
  const userRepo = new UserRepositoryTest();

  const addUser = new AddUser(userValidator, encrypter, userRepo);

  test('Should call user validator', async () => {
    const spyValidator = jest.spyOn(userValidator, 'validator');

    await addUser.add(addUserData);

    expect(spyValidator).toHaveBeenCalledWith(addUserData);
  });

  test('Should throw an error when request data is invalid', async () => {
    const errorData = {
      status: 400,
      message: 'Invalid or missing param was sent',
      error: 'fields',
    };

    jest.spyOn(userValidator, 'validator').mockReturnValueOnce({ error: 'fields', isValid: false });

    await expect(() => addUser.add(addUserData)).rejects.toEqual(errorData);
  });

  test('Should call encrypter with password', async () => {
    const spyEncrypter = jest.spyOn(encrypter, 'encrypt');

    await addUser.add(addUserData);

    expect(spyEncrypter).toHaveBeenCalledWith(addUserData.password);
  });

  test('Should call user repository with correct values', async () => {
    const spyEncrypter = jest.spyOn(userRepo, 'store');

    await addUser.add(addUserData);

    const { passwordConfirm, ...rest } = addUserData;

    const userData: UserModel = {
      ...rest,
      password: 'hashed-value',
    };

    expect(spyEncrypter).toHaveBeenCalledWith(userData);
  });

  test('Should return user data', async () => {
    const userResponse = await addUser.add(addUserData);

    expect(userResponse).toEqual(user);
  });
});
