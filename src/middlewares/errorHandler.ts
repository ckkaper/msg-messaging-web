import { logger } from '../config/logger';
import { NextFunction, Response, Request } from 'express';
import { IApiError } from '../utils/apiError';

const errorHandler = (
  err: IApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  // TODO: Add check to not throw sensitive information for production environment
  logger.error(err);

  res.status(statusCode).send(message);
};
export default errorHandler;
