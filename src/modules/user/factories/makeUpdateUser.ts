import { UpdateUser } from '../Service/UpdateUser';
import { EncrypterAdapter } from '../adapters/EncrypterAdapter';
import { UserValidatorAdapter } from '../adapters/UserValidatorAdapter';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';

export async function makeUpdateUser(requestBody: UserCreateModel, userId: number) {
  const userValidatorAdapter = new UserValidatorAdapter();
  const encryAdapter = new EncrypterAdapter(12);
  const userRepo = new PrismaUserRepository();

  const updateUser = new UpdateUser(userValidatorAdapter, encryAdapter, userRepo);

  const user = await updateUser.update(requestBody, userId);

  return user;
}
