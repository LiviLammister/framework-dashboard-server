'use strict';

const express = require('express');

const db = require('./db/db');
const { User } = require('./db/models');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(3000, () => 
    console.log('Listening on port 3000');
);