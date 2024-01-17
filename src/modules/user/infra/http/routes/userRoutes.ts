import { NextFunction, Request, Response, Router } from 'express';
import { makeAddUser } from '../../../factories/makeAddUser';
import { adminRole } from '../../../../../shared/http/middlewares/adminRole';
import { makeUpdateUser } from '../../../factories/makeUpdateUser';
import { makeGetAllUsers } from '../../../factories/makeGetAllUsers';

const userRoutes = Router();

userRoutes.post('/', adminRole, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await makeAddUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

userRoutes.put('/:userId', adminRole, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.userId);
    await makeUpdateUser(req.body, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

userRoutes.get('/', adminRole, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.userId);
    const users = await makeGetAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export { userRoutes };
