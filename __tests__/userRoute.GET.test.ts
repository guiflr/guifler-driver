import request from 'supertest';
import { app } from '../src/shared/http/routes';
import { createToken } from './factory/createToken';
import { addUserData } from './factory/fakeData';
import prisma from '../src/shared/infra/prisma/client';

describe('userRoute POST', () => {
  const user = { user: { id: 1, role: 'admin' } };
  const { passwordConfirm, ...userData } = addUserData;

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  test('Should return not admin users', async () => {
    const token = createToken(user);

    await prisma.user.create({ data: userData });
    await prisma.user.create({ data: { ...userData, role: 'creator' } });

    const response = await request(app)
      .get(`/users`)
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    expect(response.status).toBe(200);
    const parsed = JSON.parse(response.text);
    const [{ id, ...userResponse }] = parsed;
    expect(userResponse).toEqual({ ...userData, role: 'creator' });
  });
});