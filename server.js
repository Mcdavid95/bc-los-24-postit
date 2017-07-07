import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/api/user/signup');
});

app.post('/api/user/signin', (req, res) => res.status(200).json({
  message: 'welcome to the login page',
}));

app.post('/api/group/', (req, res) => {
  res.json('I am a user');
});

app.post('/api/group/:id/user', (req, res) => {
  res.json('I add a group user');
});

app.post('/api/group/:id/message', (req, res) => {
  res.json('I am a message');
});

app.post('/api/group/:id/messages', (req, res) => {
  res.json('I messages in a group');
});

app.get('*', (req, res) => res.status(200).json({
  message: 'Welcome to the beginning of nothingness.',
}));

const port = 1337;
const server = app.listen(process.env.PORT || port, () => (`LISTENING ON PORT ${port}...`));
export default server;

