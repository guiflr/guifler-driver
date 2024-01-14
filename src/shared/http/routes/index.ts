import express from 'express';
import { userRoutes } from '../../../modules/user/infra/http/routes/userRoutes';
import { authentication } from '../middlewares/authentication';

const app = express();

app.use(authentication);

app.use('/users', userRoutes);

export { app };
