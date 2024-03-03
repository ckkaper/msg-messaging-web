import express from "express";
import http from "http";
import { config } from "./config/config";
import { Server } from "socket.io";
import routes from "./routes/routes";
import { BaDRequestApiError } from "./utils/apiError";
import { logger } from "./utils/logger";
import errorMiddleware from "./middlewares/errorMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(routes);

app.get("/err", () => {
    throw new BaDRequestApiError("some bad request error");
});

io.on("connection", (socket) => {
    console.log("a user connected");
});

server.listen(config.dev.port, () => {
    logger.log(
        "info",
        `${config.dev.application_name} listening on port ${config.dev.port}`
    );
});

app.use(errorMiddleware);
