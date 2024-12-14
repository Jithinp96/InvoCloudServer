import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import AppError from './utils/appError.js';

import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();
connectDB();

const app = express()

const corsOptions = {
    origin: `${process.env.CORS_URL}`,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}

app.use(cookieParser())
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api', userRoutes)
app.use('/api', itemRoutes)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler)

export default app;