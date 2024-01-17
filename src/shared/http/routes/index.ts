import express from 'express';
import { userRoutes } from '../../../modules/user/infra/http/routes/userRoutes';
import { authentication } from '../middlewares/authentication';
import cors from 'cors';
import { errorMiddleware } from '../middlewares/errorMiddleware';
import { signInRoute } from '../../../modules/user/infra/http/routes/signInRoute';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/signin', signInRoute);

app.use(authentication);

app.use('/users', userRoutes);

app.use(errorMiddleware);

export { app };
