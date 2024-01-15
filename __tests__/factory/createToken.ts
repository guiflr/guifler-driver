import 'dotenv/config';

import jwt from 'jsonwebtoken';

export const createToken = () => {
  const secret = process.env.TOKEN_SECRET as string;

  const token = jwt.sign({ user: { id: 1 } }, secret);

  return token;
};
