import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";
import { config } from "../config/config";

export const authorizationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // check cookie

    logger.info("AUTHORIZATION MIDDLEWARE");

    const sessionId = req.cookies?.sessionId;
    if (req.cookies != null) {
        console.log("SessionId");
        console.log(JSON.stringify(req.cookies));
    }

    logger.info("checking if session is null");
    if (sessionId == null) {
        // TODO: retrieve params clientId from config
        // TODO: validate session id against the identity server
        logger.info("redirecting to authorization server");
        const redirect =
            `http://localhost:${config.dev.identity_server_port}/authorize?` +
            "response_type=code&" +
            "client_id=OKg3URj8JWuYrgQDrk1QIzg==&" +
            "scope=openid email&" +
            `redirect_uri=http://localhost:${config.dev.port}`;
        return res.redirect(redirect);
    }

    next();
};
