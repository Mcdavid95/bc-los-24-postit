import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';
import open from 'open';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.prod';


// ROUTES

import authRoutes from './server/routes/authRoute';
import groupRoutes from './server/routes/groupRoute';

dotenv.config();
const compiler = webpack(config);
const port = process.env.PORT_PROD;
const app = express();
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('connect-multiparty')());

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));


// Express CONFIGURATION
// app.use(require('express-session')({
//   secret: 'Anywhere I go',
//   resave: false,
//   saveUninitialized: false
// }));


// ROUTES CONFIG

app.use(authRoutes);
app.use(groupRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'index.html'));
});
// If no route is matched return a 404
app.use((req, res, next) => {
  res.status(501).send({
    status: false,
    message: 'Sorry, this address is not supported by this API.'
  });
  next();
});

// Listening PORT
app.listen(port, (err) => {
  if (!err) open(`http://localhost:${port}`); else {
    console.log(err);
  }
});

export default app;
