import { UpdateUser } from '../Service/UpdateUser';
import { UpdateUserValidatorAdapter } from '../adapters/UpdateUserValidatorAdapter';
import { UserCreateModel } from '../domain/useCases/UserCreate';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';

export async function makeUpdateUser(requestBody: UserCreateModel, userId: number) {
  const userValidatorAdapter = new UpdateUserValidatorAdapter(); 
  const userRepo = new PrismaUserRepository();

  const updateUser = new UpdateUser(userValidatorAdapter, userRepo);

  const user = await updateUser.update(requestBody, userId);

  return user;
}
