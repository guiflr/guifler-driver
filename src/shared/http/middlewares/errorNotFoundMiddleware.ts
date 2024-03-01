import { Request, Response, NextFunction } from 'express';
import { notFoundError } from '../../errors/notFoundError';

export const errorNotFoundMiddleware = (req: Request, res: Response) => {
  return res.status(404).json(notFoundError('Resource not founded'));
};
