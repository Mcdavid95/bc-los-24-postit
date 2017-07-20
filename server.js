import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';


// ROUTES

import authRoutes from './server/routes/authRoute';
import groupRoutes from './server/routes/groupRoute';

dotenv.config();


const app = express();
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('connect-multiparty')());

app.use(express.static(path.join(__dirname, '/public')));


// Express CONFIGURATION
// app.use(require('express-session')({
//   secret: 'Anywhere I go',
//   resave: false,
//   saveUninitialized: false
// }));


// ROUTES CONFIG
app.get('/', (req, res) => {
  res.status(200).send('Welcome to postit');
});
app.use(authRoutes);
app.use(groupRoutes);


// If no route is matched return a 404
app.use((req, res, next) => {
  res.status(501).send({
    status: false,
    message: 'Sorry, this address is not supported by this API.'
  });
  next();
});

// Listening PORT
app.listen(process.env.PORT || 3000, () => {
  console.log('serving on port 3000');
});

export default app;
