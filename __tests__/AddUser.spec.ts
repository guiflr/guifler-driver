import { AddUser } from '../src/modules/user/Service/AddUser';
import { UserValidatorTest, addUserData } from './factory/fakeData';

describe('AddUser', () => {
  const userValidator = new UserValidatorTest();
  const addUser = new AddUser(userValidator);

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

    jest.spyOn(userValidator, 'validator').mockReturnValue({ error: 'fields', isValid: false });

    await expect(() => addUser.add(addUserData)).rejects.toEqual(errorData);
  });
});
