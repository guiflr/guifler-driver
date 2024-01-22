import { createToken } from './factory/createToken';
import { addUserData } from './factory/fakeData';
import request from 'supertest';
import { app } from '../src/shared/http/routes';
import prisma from '../src/shared/infra/prisma/client';

describe('signInRoute', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });
  const userData = { id: 1, role: 'admin' };
  test('Should return 400 when not send email', async () => {
    const token = createToken(userData);

    const response = await request(app).post(`/signin`).send({ password: 'pass' });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when not send password', async () => {
    const token = createToken(userData);

    const response = await request(app).post(`/signin`).send({ email: 'email' });

    expect(response.status).toBe(400);
  });

  test('Should return 401 when email is not founded', async () => {
    const token = createToken(userData);

    await request(app).post('/users').set('Authorization', `bearer ${token}`).send(addUserData);

    const response = await request(app)
      .post(`/signin`)
      .send({ email: 'addUserData.email', password: 'password' });

    expect(response.status).toBe(401);
  });

  test('Should return 401 when password is invalid', async () => {
    const token = createToken(userData);

    await request(app).post('/users').set('Authorization', `bearer ${token}`).send(addUserData);

    const response = await request(app)
      .post(`/signin`)
      .send({ email: addUserData.email, password: 'invalid-password' });

    expect(response.status).toBe(401);
  });
});
