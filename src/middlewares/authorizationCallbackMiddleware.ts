import { logger } from "../utils/logger";
import { Response, Request, NextFunction } from "express";
import { config } from "../config/config";
import axios from "axios";
import { BadRequestApiError } from "../utils/apiError";

/**
 * Callback middleware to recieve authorization response.
 * @param req
 * @param res
 * @param next
 * @returns
 */
const authorizationCallbackMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.info("AuthorizationCallbackMiddleware:  entry");
    // TODO: request validation
    const authorizationCode = req.query.code?.toString();
    const redirectUri = req.query.redirect_uri?.toString();
    const sessionId = req.query.sessionId?.toString();

    if (authorizationCode == null) {
        return new BadRequestApiError("Authorization code was not provided.")
    }

    if (redirectUri == null) {
        return new BadRequestApiError("redirectUri was not provided")
    }
    
    // // TODO: investigate why this was removed.
    // if (sessionId == null) {
    //     return new BadRequestApiError("SessionId was not present")
    // }

    logger.info("AuthorizationCallbackMiddleware: Exchange code with token");

    // TODO: Move that to its own service.
    const token = await axios
        .post(
            `http://${config.dev.identity_server_host_hostname}:${config.dev.identity_server_port}/token?code=${authorizationCode}&redirect_uri=${redirectUri}`,
            {
                clientId: "OKg3URj8JWuYrgQDrk1QIzg==",
                clientSecret: "PvAIUSQXgmmPjeyWKp7N2oX==",
            }
        )
        .catch((err) => {
            logger.error('Failed to exchange authorization code with Id Token');
            logger.error(err);
        });

    logger.info(`AuthorizationCallbackMiddleware: Token Result: ${token?.data}`);

    // res.set("sessionId", token?.data);
    logger.info(`AuthorizationCallbackMiddleware: Redirecting to the Homepage: ${token?.data}`);

    console.log(token?.data);
    res.cookie('sessionId', token?.data);
    res.redirect(`http://localhost:${config.dev.port}/`);


    // res.redirect(`http://localhost:${config.dev.port}/`);
};

export default authorizationCallbackMiddleware;
