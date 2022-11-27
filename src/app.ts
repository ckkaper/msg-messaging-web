import express from 'express';
import { config } from './config/config';
import usersRouter  from './routes/usersRoute';

const app = express();

app.use(usersRouter);
app.listen(config.dev.port, () => {
    console.log(`${config.dev.application_name} listening on port ${config.dev.port}`);
});