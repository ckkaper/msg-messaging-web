import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";
import { IApiError } from "../utils/apiError";

const errorHandler = (err: IApiError, _: Request, res: Response, next: NextFunction) => {
        const { statusCode, message } = err;

        // TODO: Add check to not throw sensitive information for production environment
        logger.error(err);

        
        res.status(statusCode).send(message);
};
export default errorHandler;
