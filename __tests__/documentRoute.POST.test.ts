import request from 'supertest';
import { app } from '../src/shared/http/routes';
import { createToken } from './factory/createToken';
import { addUserData } from './factory/fakeData';
import prisma from '../src/shared/infra/prisma/client';

describe('userRoute POST', () => {
  const user = { id: 1, role: 'admin' } 
  const invalidUser = { id: 1, role: 'guest' } 

  beforeEach(async () => {
    await prisma.document.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.document.deleteMany();
    await prisma.user.deleteMany();
  });

  test('Should return 401 if token is not sent', async () => {
    const response = await request(app).post(`/documents`).send(addUserData);

    expect(response.status).toBe(401);
  });

  test('Should return 403 if user has not permission', async () => {
    const token = createToken(invalidUser);

    const response = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    expect(response.status).toBe(403);
  });

  test('Should return 400 if data is invalid', async () => {
    const token = createToken(user);

    const response = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    expect(response.status).toBe(400);
  });

  test('Should return 400 if user is not sent', async () => {
    const token = createToken(user);

    const reqData = { name: 'my-document', type: 'folder', owner_id: null };

    const response = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send(reqData);

    expect(response.status).toBe(400);
  });

  test('Should return 400 if user is not sent', async () => {
    const token = createToken(user);

    const reqData = { name: 'my-document', type: 'folder', owner_id: null };

    const response = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
  });

  test('Should return 400 if user not exists', async () => {
    const token = createToken(user);

    const reqData = { name: 'my-document', type: 'folder', owner_id: null };

    const userResponse = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    const userData = JSON.parse(userResponse.text);

    const response = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send({ ...reqData, user_id: userData.id + 10 });

    expect(response.status).toBe(400);
  });

  test('Should return data', async () => {
    const token = createToken(user);

    const reqData = { name: 'my-document', type: 'folder', owner_id: null };

    const userResponse = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    const userData = JSON.parse(userResponse.text);

    const response = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send({ ...reqData, user_id: userData.id });

    expect(response.status).toBe(200);

    const parsed = JSON.parse(response.text);
    const { id, ...responseData } = parsed;
    expect(responseData).toEqual({ ...reqData, user_id: userData.id });
  });
});
