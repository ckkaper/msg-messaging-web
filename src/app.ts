import express from 'express';
import { config } from './config/config';
import usersRouter from './routes/usersRoute';
import { BaDRequestApiError } from './utils/apiError';
import { logger } from './config/logger';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.get('/err', (req, res, next) => {
  throw new BaDRequestApiError('some bad request error');
});

app.use(usersRouter);
app.listen(config.dev.port, () => {
  logger.log(
    'info',
    `${config.dev.application_name} listening on port ${config.dev.port}`
  );
});

app.use(errorHandler);
