'use strict';

const express = require('express');

const db = require('./db/db');
const { User } = require('./db/models');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get(`/api/frameworks/:vote`, async (req, res, next) => {
    const { vote } = req.params;
    const users = await User.findAll({ where: { vote } })
    res.send({count: users.length})
    next();
})

// Creates a new user
app.post('/api/user', (req, res, next) => {
    User.create(req.body);
    next();
});

// Changes the user's vote
app.put('/api/user', async (req, res, next) => {
    const { email, vote } = req.body;
    await User.update(
        { vote },
        { where: { email } }
    );
    next();
});

db.sync();
app.listen(3000, () =>
    console.log('Listening on port 3000')
);