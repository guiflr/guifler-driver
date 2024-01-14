import { Request, Response, NextFunction } from 'express';
import { tokenValidator } from '../../helpers/tokenValidator';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization as string;
  const secret = process.env.TOKEN_SECRET as string;

  const decoded = tokenValidator(bearer, secret);

  req.headers['data'] = JSON.stringify(decoded);

  next();
};
