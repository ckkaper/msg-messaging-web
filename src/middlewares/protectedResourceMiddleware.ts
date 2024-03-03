import { logger } from "../utils/logger";
import { Request, Response, NextFunction } from "express";

export const protectedResourceMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.info("ProtectedMiddleware: Entered protected resource");
    return res.send("protected resource accessed");
};
