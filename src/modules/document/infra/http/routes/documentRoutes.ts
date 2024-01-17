import { NextFunction, Request, Response, Router } from 'express';
import { makeCreateDocument } from '../../../factories/makeCreateDocument';
import { adminRole } from '../../../../../shared/http/middlewares/adminRole';
import { makeGetAllDocuments } from '../../../factories/makeGetAllDocuments';

const documentRoutes = Router();

documentRoutes.post('/', adminRole, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await makeCreateDocument(req.body);
    res.json(document);
  } catch (err) {
    next(err);
  }
});

documentRoutes.get(
  '/user/:id',
  adminRole,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const documents = await makeGetAllDocuments(userId);
      res.json(documents);
    } catch (err) {
      next(err);
    }
  }
);

export { documentRoutes };
