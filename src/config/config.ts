import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

export const config = {
        env: process.env.ENVIRONMENT,
        dev: {
                port: process.env.PORT,
                application_name: process.env.APPLICATION_NAME,
                mock_data_path: resolve(
                        __dirname,
                        "../../src/repositories/mock_data.json"
                ),
        },
};
