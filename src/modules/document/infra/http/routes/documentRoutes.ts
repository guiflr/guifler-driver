import { NextFunction, Request, Response, Router } from 'express';
import { makeCreateDocument } from '../../../factories/makeCreateDocument';
import { adminRole } from '../../../../../shared/http/middlewares/adminRole';

const documentRoutes = Router();

documentRoutes.post('/', adminRole, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await makeCreateDocument(req.body);
    res.json(document);
  } catch (err) {
    next(err);
  }
});

export { documentRoutes };
