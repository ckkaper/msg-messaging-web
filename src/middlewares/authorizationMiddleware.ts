import { logger } from "../utils/logger";
import { Response, Request, NextFunction } from "express";
import { config } from "../config/config";

export const authorizationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // check cookie

    logger.info("AuthorizationMiddleware: Entry");

    const sessionId = req.cookies?.sessionId;
    if (req.cookies != null) {
        logger.info(JSON.stringify(req.cookies));
    }

    logger.info("AuthorizationMiddleware: checking if session is null");
    if (sessionId == null) {
        // TODO: retrieve params clientId from config
        // TODO: validate session id against the identity server

        logger.info(
            "AuthorizationMiddelware: redirecting to authorization server"
        );

        const redirectUri =
            `http://${config.dev.identity_server_host_hostname}:${config.dev.identity_server_port}/authorize?` +
            "response_type=code&" +
            "client_id=OKg3URj8JWuYrgQDrk1QIzg==&" +
            "scope=openid email&" +
            `redirect_uri=http://localhost:${config.dev.port}`;
        return res.redirect(redirectUri);
    }

    next();
};
