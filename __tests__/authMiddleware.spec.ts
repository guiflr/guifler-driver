import 'dotenv/config';

import request from 'supertest';
import { app } from '../src/shared/http/routes';
import jwt from 'jsonwebtoken';

describe('userRoues', () => {
  test('Should return 401 when bearer is not sent', async () => {
    const response = await request(app).post('/users').send({});

    expect(response.status).toBe(401);
  });

  test('Should return 401 when token is not sent', async () => {
    const response = await request(app).post('/users').set('Authorization', `bearer `).send({});

    expect(response.status).toBe(401);
  });

  test('Should return 400 when token is valid', async () => {
    const secret = process.env.TOKEN_SECRET as string;

    const token = jwt.sign({ user: { id: 1 } }, secret);

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });
});
