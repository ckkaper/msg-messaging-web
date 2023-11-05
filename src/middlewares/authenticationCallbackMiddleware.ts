import { logger } from "../config/logger";
import { Response, Request, NextFunction } from "express";
import { config } from "../config/config";
import axios from "axios";
import jwt from "jsonwebtoken";

/**
 * Callback middleware to recieve authorization response.
 * @param req
 * @param res
 * @param next
 * @returns
 */
const authenticationCallbackMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.info("AUTHORIZATION CALLBACK MIDDLEWARE");
    // TODO: request validation
    // - retrieve authorization code
    // - retrieve redirect_uri
    // - token request
    const authorizationCode = req.query.code?.toString();
    const redirectUri = req.query.redirect_uri?.toString();
    const sessionId = req.query.sessionId?.toString();

    if (authorizationCode == null) {
        logger.error("authorization code was not provided");
        return;
    }

    if (redirectUri == null) {
        logger.error("redirectUri was not provided");
        return;
    }

    if (sessionId == null) {
        logger.info("sessionId was not present");
    }

    logger.info('Exchange Code with Token');

    const token = await axios
        .post(
            `http://localhost:${config.dev.identity_server_port}/token?code=${authorizationCode}&redirect_uri=${redirectUri}`,
            {
                clientId: "OKg3URj8JWuYrgQDrk1QIzg==",
                clientSecret: "PvAIUSQXgmmPjeyWKp7N2oX==",
            }
        )
        .catch((err) => {
            logger.error(err);
        });
    logger.info(`TOKEN RESULT: ${token?.data}`);

    res.cookie("sessionId", token?.data);

    res.redirect(`http://localhost:3000/`);
};

export default authenticationCallbackMiddleware;
