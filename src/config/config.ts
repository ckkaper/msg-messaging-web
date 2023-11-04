import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

export const config = {
    env: process.env.ENVIRONMENT,
    dev: {
        secrets: {
            jwt_token_secret: process.env.JWT_TOKEN_SECRET,
        },
        port: process.env.PORT,
        identity_server_port: process.env.IDENTITY_SERVER_PORT,
        application_name: process.env.APPLICATION_NAME,
        mock_data_path: resolve(
            __dirname,
            "../../src/repositories/mock_data.json"
        ),
    },
};
