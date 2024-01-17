import prisma from '../../../../../shared/infra/prisma/client';
import { UserRepository } from '../../../repositories/UserRepository';

export class PrismaUserRepository implements UserRepository {
  async get(userId: number): Promise<{ id: number } | null> {
    const user = await prisma.user.findFirst({ where: { id: userId }, select: { id: true } });

    return user;
  }
}
