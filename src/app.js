import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express()

const corsOptions = {
    origin: `${process.env.CORS_URL}`,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}

app.use(cookieParser())

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Hi from the API"));
app.use('/api', userRoutes)

export default app;