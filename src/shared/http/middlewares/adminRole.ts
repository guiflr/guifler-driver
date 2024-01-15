import { Request, Response, NextFunction } from 'express';
import { forbiddenError } from '../../errors/forbiddenError';

export const adminRole = (req: Request, res: Response, next: NextFunction) => {
  const userHeader = req.headers['data'] as string;

  const data = JSON.parse(userHeader);

  if (data.user.role !== 'admin') {
    throw forbiddenError();
  }

  next();
};
