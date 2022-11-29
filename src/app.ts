import express from 'express';
import { config } from './config/config';
import usersRouter from './routes/usersRoute';
import winston, { level } from 'winston';

var logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

var childLogger = logger.child({
  requestId: '451',
  name: 'Kyriakos',
  surname: 'Kaperonis'
});

const app = express();

app.use(usersRouter);
app.listen(config.dev.port, () => {
  childLogger.log(
    'info',
    `${config.dev.application_name} listening on port ${config.dev.port}`
  );
});
