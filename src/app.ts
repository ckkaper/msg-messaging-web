import express from 'express';
import * as dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use('/', (req, res, next) => {
    res.send('Hello world');
});

app.listen(process.env.PORT, () => {
    console.log(`${process.env.APPLICATION_NAME} listening on port ${process.env.PORT}`);
});