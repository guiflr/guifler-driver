import jwt from 'jsonwebtoken';
import { tokenValidator } from '../shared/helpers/tokenValidator';

describe('tokenValidator', () => {
  test('Should throw an error if token is not received', () => {
    const token = '';

    expect(() => tokenValidator(token, '')).toThrow('bearer was not sent');
  });

  test('Should throw an error if token is not valid', () => {
    const token = 'bearer token';

    expect(() => tokenValidator(token, '')).toThrow('invalid token was sent');
  });

  test('Should return a valid value', () => {
    const secret = 'secret';
    const token = jwt.sign({ user: { id: 1 } }, secret);

    const bearer = `bearer ${token}`;

    const decoded = tokenValidator(bearer, secret);

    expect(decoded).toHaveProperty('user');
    expect(decoded).toHaveProperty('user.id');
  });
});
