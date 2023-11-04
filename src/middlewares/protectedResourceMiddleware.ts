import { logger } from "../config/logger";
import { Request, Response, NextFunction } from "express";

export const protectedResourceMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.info("entered protected resource");
    return res.send("protected resource accessed");
};
