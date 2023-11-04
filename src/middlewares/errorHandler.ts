import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";
import { IApiError } from "../utils/apiError";

const errorHandler = (
    err: IApiError,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    logger.info("inside error middleware");
    const { statusCode, message } = err;

    const statusCodeGen = statusCode || 500;

    logger.info(`error status code: ${statusCodeGen} message: ${message}`);

    logger.error(err);

    res.status(statusCodeGen).send({ error: "something broke!" });
};
export default errorHandler;
