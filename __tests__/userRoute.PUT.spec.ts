import request from 'supertest';
import { app } from '../src/shared/http/routes';
import { createToken } from './factory/createToken';
import { prismaMock } from './singleton';
import { addUserData, user } from './factory/fakeData';

describe('userRoute POST', () => {
  const userData = { user: { id: 1, role: 'admin' } };
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

    prismaMock.user.update.mockResolvedValueOnce(user);

    const response = await request(app)
      .put(`/users/${1}`)
      .set('Authorization', `bearer ${token}`)
      .send(addUserData);
    expect(response.status).toBe(204);
  });
});
