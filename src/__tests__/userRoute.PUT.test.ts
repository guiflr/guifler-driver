import request from 'supertest';
import { app } from '../shared/http/routes';
import { addUserData } from './factory/fakeData';
import prisma from '../shared/infra/prisma/client';
import { createToken } from './factory/createToken';

describe('userRoute POST', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  const userData = { id: 1, role: 'admin' };
  test('Should return 400 when payload is invalid', async () => {
    const token = createToken(userData);

    const response = await request(app)
      .put(`/users/${1}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        email: 'user1@example.com',
        password: '123456',
      });
    expect(response.status).toBe(400);
  });

  test('Should update user', async () => {
    const token = createToken(userData);

    const { passwordConfirm, ...userField } = addUserData;

    const user = await prisma.user.create({ data: userField });

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    expect(response.status).toBe(204);
  });
});
