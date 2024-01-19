import { GetUsers } from '../Service/GetUsers';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';

export async function makeGetAllUsers() {
  const userRepo = new PrismaUserRepository();

  const getUsers = new GetUsers(userRepo);

  const user = await getUsers.getAll();

  return user;
}
