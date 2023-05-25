import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { foodRouter, userRouter } from './routers/index';
import mongoose from 'mongoose';
import { logger } from './middlewares';

dotenv.config();
const PORT = process.env.PORT;

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(logger);

app.use('/food', foodRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:${PORT}`);
    mongoose.connect(`${process.env.MONGODB_SERVER_URL}`, {})
        .then(() => {
            console.info(`🤗 [server]: Connected to MongoDB`);
        })
        .catch((error: mongoose.Error) => {
            console.error(`🤨 [server]: Failed to connect to mongodb\n ${error.message}`);
        });
});
