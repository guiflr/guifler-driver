import 'dotenv/config';

import request from 'supertest';
import { app } from '../src/shared/http/routes';
import { createToken } from './factory/createToken';

describe('adminRole', () => {
  test('Should return 403 when user has not permission', async () => {
    const user =  { id: 1, role: 'guest' } ;
    const token = createToken(user);
    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send({});

    expect(response.status).toBe(403);
  });
});
