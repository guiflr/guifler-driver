import { prismaMock } from './singleton';
import { user as userFake, addUserData } from './factory/fakeData';
import { PrismaUserRepository } from '../src/modules/user/infra/prisma/repositories/PrismaUserRepository';

describe('PrismaUserRepository', () => {
  const userRepo = new PrismaUserRepository();

  test('Should store user', async () => {
    const { passwordConfirm, ...userData } = addUserData;

    prismaMock.user.create.mockResolvedValueOnce(userFake);

    const user = await userRepo.store(userData);

    expect(user).toHaveProperty('id');
    expect(user.id).toEqual(1);
  });
});
