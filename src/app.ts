import express from "express";
import http from "http";
import { config } from "./config/config";
import { Server } from "socket.io";
import usersRouter from "./routes/usersRoute";
import { BaDRequestApiError } from "./utils/apiError";
import { logger } from "./config/logger";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(usersRouter);

app.get("/err", () => {
        throw new BaDRequestApiError("some bad request error");
});

io.on('connection', (socket) => {
        console.log("a user connected");
});


server.listen(config.dev.port, () => {
        logger.log(
                "info",
                `${config.dev.application_name} listening on port ${config.dev.port}`
        );
});

app.use(errorHandler);
