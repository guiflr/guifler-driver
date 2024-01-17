import { UserModel } from '../../../domain/models/UserModel';
import { UserDTO, UserRepository } from '../../../repositories/UserRepository';
import prisma from '../../../../../shared/infra/prisma/client';

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user;
  }
  async findAll(): Promise<UserDTO[]> {
    const users = await prisma.user.findMany({
      where: { role: { not: { equals: 'admin' } } },
    });

    return users;
  }
  async update(user: UserModel, userId: number): Promise<void> {
    await prisma.user.update({ where: { id: userId }, data: user });
  }
  async store(user: UserModel): Promise<UserDTO> {
    const data = await prisma.user.create({
      data: user,
    });

    return data;
  }
}
