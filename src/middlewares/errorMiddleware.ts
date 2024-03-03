import { logger } from "../utils/logger";
import { Response, Request, NextFunction } from "express";
import { IApiError } from "../utils/apiError";

const errorMiddleware = (
    err: IApiError,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    const { statusCode, message, stack } = err;

    res.status(statusCode).send({ message, stack });
};
export default errorMiddleware;
