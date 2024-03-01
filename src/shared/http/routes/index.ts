import express from 'express';
import { userRoutes } from '../../../modules/user/infra/http/routes/userRoutes';
import { authentication } from '../middlewares/authentication';
import cors from 'cors';
import { errorMiddleware } from '../middlewares/errorMiddleware';
import { signInRoute } from '../../../modules/user/infra/http/routes/signInRoute';
import { documentRoutes } from '../../../modules/document/infra/http/routes/documentRoutes';
import { errorNotFoundMiddleware } from '../middlewares/errorNotFoundMiddleware';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/signin', signInRoute);

app.use('/users', authentication, userRoutes);
app.use('/documents', authentication, documentRoutes);

app.use(errorMiddleware);

app.use(errorNotFoundMiddleware);

export { app };
