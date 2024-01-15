import { UserModel } from '../../../domain/models/UserModel';
import { UserDTO, UserRepository } from '../../../repositories/UserRepository';
import prisma from '../../../../../shared/infra/prisma/client';

export class PrismaUserRepository implements UserRepository {
  async update(user: UserModel): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async store(user: UserModel): Promise<UserDTO> {
    const data = await prisma.user.create({ data: user });

    return data;
  }
}
