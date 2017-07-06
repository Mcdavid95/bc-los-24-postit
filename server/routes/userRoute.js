import express from 'express';
import bodyParser from 'body-parser';
import db from '../models';


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

