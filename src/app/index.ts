import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.options('*', function(_req,res){ res.sendStatus(200); });

app.use(cors({
  origin: 'http://localhost:1212',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

export default app;
