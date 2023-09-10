import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";

export const authorizationMiddleware = (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        // check cookie

        logger.info("entering authorization middleware");

        const sessionId = req.cookies?.sessionId;

        if (sessionId == null) {
                logger.info("checking if session is null");
                // TODO: retrieve params clientId from config
                // TODO: validate session id against the identity server
                logger.info('redirecting to authorization server')
                return res.redirect(
                        "http://localhost:3001/authorize?" +
                                "response_type=code&" +
                                "client_id=OKg3URj8JWuYrgQDrk1QIzg==&" +
                                "scope=openid email&" +
                                "redirect_uri=http://localhost:3000"
                );
        }

        next();
};
