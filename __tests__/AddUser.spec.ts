import { AddUser } from '../src/modules/user/Service/AddUser';
import { EncrypterTest, UserValidatorTest, addUserData } from './factory/fakeData';

describe('AddUser', () => {
  const userValidator = new UserValidatorTest();
  const encrypter = new EncrypterTest();
  const addUser = new AddUser(userValidator, encrypter);

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
});
