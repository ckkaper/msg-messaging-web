import { logger } from "../config/logger";
import { Router } from "express";
import UsersService from "./../services/usersService";

const usersRouter = Router();
const usersService = new UsersService();

usersRouter.get("/users", (_, res) => {
        const users = usersService.getAllUsers();
        res.json(users);
});

usersRouter.get("/users/:id", (req, res) => {
        const userId = req.params.id.toString();

        if (userId == null) {
                logger.error("Controller: getUsers(): BadRequest");
                res.sendStatus(400);
        }

        const users = usersService.getUser(userId);
        res.json(users);
});

export default usersRouter;
