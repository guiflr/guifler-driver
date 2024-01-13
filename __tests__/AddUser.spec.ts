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
});
