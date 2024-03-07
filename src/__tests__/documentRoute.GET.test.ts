import request from 'supertest';
import { app } from '../shared/http/routes';
import { createToken } from './factory/createToken';
import { addUserData } from './factory/fakeData';
import prisma from '../shared/infra/prisma/client';

describe('userRoute POST', () => {
  const user = { id: 1, role: 'admin' };

  beforeEach(async () => {
    await prisma.document.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.document.deleteMany();
    await prisma.user.deleteMany();
  });

  test('Should return documents', async () => {
    const token = createToken(user);

    const reqData = { name: 'my-document', type: 'folder', owner_id: null };

    const userResponse = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);

    const userData = JSON.parse(userResponse.text);

    const document1 = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send({ ...reqData, user_id: userData.id });

    const document2 = await request(app)
      .post(`/documents`)
      .set('Authorization', `bearer ${token}`)
      .send({ ...reqData, user_id: userData.id });

    const response = await request(app)
      .get(`/documents/user/${userData.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.text).toEqual(`[${document1.text},${document2.text}]`);
  });
});
