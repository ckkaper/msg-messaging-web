import * as dotenv from "dotenv";

dotenv.config();

export const config = {
        env: process.env.ENVIRONMENT,
        dev: {
                port: process.env.PORT,
                application_name: process.env.APPLICATION_NAME,
        },
};
