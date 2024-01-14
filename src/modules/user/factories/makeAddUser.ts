import { UserValidatorAdapter } from '../adapters/UserValidatorAdapter';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { AddUser } from '../service/AddUser';

export async function makeAddUser(requestBody: UserCreateModel) {
  const userValidatorAdapter = new UserValidatorAdapter();
  const addUser = new AddUser(userValidatorAdapter);
}
