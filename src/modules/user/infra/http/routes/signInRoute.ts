import { NextFunction, Request, Response, Router } from 'express';
import { signIn } from '../../../factories/makeSignIn';

const signInRoute = Router();

signInRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await signIn(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export { signInRoute };
