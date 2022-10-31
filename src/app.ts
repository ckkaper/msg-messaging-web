import express from 'express';
import * as dotenv from 'dotenv';
import { config } from './config/config';

const app = express();

app.use('/', (req, res, next) => {
    res.send('Hello world');
});

app.listen(config.dev.port, () => {
    console.log(`${config.dev.application_name} listening on port ${config.dev.port}`);
});