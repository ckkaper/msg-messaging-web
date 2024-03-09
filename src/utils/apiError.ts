import { StatusCodes } from "http-status-codes";
import { logger } from "./logger";

export interface IApiError extends Error {
    statusCode: StatusCodes;
}

export class ApiError extends Error implements IApiError {
    public statusCode: StatusCodes;
    public isOperational: boolean;

    constructor(
        statusCode: StatusCodes,
        message: string,
        isOperational = true,
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        logger.error(message);

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class BadRequestApiError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message, true);
    }
}

export class InternalServerErrorApiError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message, false);
    }
}
