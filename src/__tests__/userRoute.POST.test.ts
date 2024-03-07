import request from 'supertest';
import { app } from '../shared/http/routes';
import { createToken } from './factory/createToken';
import { addUserData, user } from './factory/fakeData';
import prisma from '../shared/infra/prisma/client';

describe('userRoute POST', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  const userData = { id: 1, role: 'admin' };
  test('Should return 400 when payload is invalid', async () => {
    const token = createToken(userData);

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send({
        email: 'user1@example.com',
        password: '123456',
      });
    expect(response.status).toBe(400);
    const body = JSON.parse(response.text);

    expect(body).toHaveProperty('message');
  });

  test('Should create user', async () => {
    const token = createToken(userData);

    const { passwordConfirm, ...userField } = addUserData;

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    expect(response.status).toBe(201);
    const body = JSON.parse(response.text);

    const { id, ...user } = body;

    expect(user.email).toEqual(userField.email);
    expect(user.role).toEqual(userField.role);
  });
});
