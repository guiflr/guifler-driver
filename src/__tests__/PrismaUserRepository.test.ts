import 'dotenv/config';

import { user as userFake, addUserData } from './factory/fakeData';
import { PrismaUserRepository } from '../modules/user/infra/prisma/repositories/PrismaUserRepository';
import prisma from '../shared/infra/prisma/client';

describe('PrismaUserRepository', () => {
  const userRepo = new PrismaUserRepository();

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  test('Should store user', async () => {
    const { passwordConfirm, ...userData } = addUserData;

    const user = await userRepo.store(userData);

    expect(user).toHaveProperty('id');
    expect(user.role).toEqual('admin');
  });

  test('Should get all not admin users', async () => {
    const { passwordConfirm, ...userData } = addUserData;

    await prisma.user.create({ data: userData });
    await prisma.user.create({
      data: { ...userData, role: 'creator', email: 'ealeatorio@rmail.com' },
    });

    const users = await userRepo.findAll();

    expect(users.length).toBe(1);
    expect(users[0].role).toBe('creator');
  });
});
