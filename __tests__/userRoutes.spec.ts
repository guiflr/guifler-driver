import request from 'supertest';
import { app } from '../src/shared/http/routes';
import { createToken } from './factory/createToken';
import { prismaMock } from './singleton';
import { addUserData, user } from './factory/fakeData';

describe('userRoues', () => {
  test('Should return 400 when payload is invalid', async () => {
    const token = createToken();

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
    const token = createToken();

    prismaMock.user.create.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);
    expect(response.status).toBe(201);
    const body = JSON.parse(response.text);

    expect(body).toEqual(user);
  });
});
