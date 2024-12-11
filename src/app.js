import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Hi from the API"));

export default app;