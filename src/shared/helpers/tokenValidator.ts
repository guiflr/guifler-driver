import { authError } from '../errors/authError';
import jwt from 'jsonwebtoken';

export const tokenValidator = (bearer: string, secret: string) => {
  if (!bearer) {
    throw authError('bearer was not sent');
  }

  const [_, token] = bearer.split(' ');

  if (!token) {
    throw authError('token was not sent');
  }

  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (err) {
    throw authError('invalid token was sent');
  }
};
