import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err) {
    if (err.status) {
      return res.status(err.status).json(err);
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }

  next();
};
