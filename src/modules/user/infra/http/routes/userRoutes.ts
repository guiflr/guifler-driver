import { NextFunction, Request, Response, Router } from 'express';
import { makeAddUser } from '../../../factories/makeAddUser';
import { adminRole } from '../../../../../shared/http/middlewares/adminRole';

const userRoutes = Router();

userRoutes.post('/', adminRole, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await makeAddUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

export { userRoutes };
