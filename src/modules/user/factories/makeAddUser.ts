import { EncrypterAdapter } from '../adapters/EncrypterAdapter';
import { UserValidatorAdapter } from '../adapters/UserValidatorAdapter';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';
import { AddUser } from '../service/AddUser';

export async function makeAddUser(requestBody: UserCreateModel) {
  const userValidatorAdapter = new UserValidatorAdapter();
  const encryAdapter = new EncrypterAdapter(12);
  const userRepo = new PrismaUserRepository();

  const addUser = new AddUser(userValidatorAdapter, encryAdapter, userRepo);

  const user = await addUser.add(requestBody);

  return user;
}
