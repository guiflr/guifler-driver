const ServerlessHttp = require('serverless-http');
import { app } from './src/shared/http/routes';

export const handler = ServerlessHttp(app);
