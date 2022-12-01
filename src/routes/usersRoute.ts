import { Router } from 'express';
import UsersService from './../services/usersService';

const usersRouter = Router();
const usersService = new UsersService();

usersRouter.get('/users', (req, res, next) => {
    const users = usersService.getAllUsers();
    res.json(users);
});

usersRouter.get('/users/:id', (req, res, next) => {
    const userId = req.params.id.toString();

    if (userId == null) {
        console.log('Controller: getUsers(): BadRequest');
        res.sendStatus(400);
    }

    const users = usersService.getUser(userId);
    res.json(users);
});

export default usersRouter;
