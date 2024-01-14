import { Request, Response, Router } from 'express';
import { makeAddUser } from '../../../factories/makeAddUser';

const userRoutes = Router();

userRoutes.post('/', (req: Request, res: Response) => {
  makeAddUser(req.body);
});

export { userRoutes };
