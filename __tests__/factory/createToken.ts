import 'dotenv/config';

import jwt from 'jsonwebtoken';

export const createToken = (data: any) => {
  const secret = process.env.TOKEN_SECRET as string;

  const token = jwt.sign(data, secret);

  return token;
};
