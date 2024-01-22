import { GetUserService } from '../Service/GetUser';
import { PrismaUserRepository } from '../infra/prisma/repositories/PrismaUserRepository';

export async function makeGetUser (id: number) {
  const userRepo = new PrismaUserRepository();

  const getUser = new GetUserService(userRepo);

  const user = await getUser.get(id);

  return user;
}
