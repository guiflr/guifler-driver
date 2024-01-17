import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';
import { GetUsers } from '../service/GetUsers';

export async function makeGetAllUsers() {
  const userRepo = new PrismaUserRepository();

  const getUsers = new GetUsers(userRepo);

  const user = await getUsers.getAll();

  return user;
}
