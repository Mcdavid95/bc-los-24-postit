import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.json()
})