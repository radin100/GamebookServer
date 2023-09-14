const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/routers/appRouter');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors({ origin: 'http://localhost:3000'}));

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/gamebook')
    .then(() => console.log('Database connected!'))
    .then(() => app.listen(3030, () => console.log('Server is currently runing on http://localhost:3030')));