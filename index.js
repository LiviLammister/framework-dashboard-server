'use strict';

const express = require('express');

const db = require('./db/db');
const { User } = require('./db/models');

const app = express();
app.use(express.json());

const ANGULAR = 'angular';
const EMBER = 'ember';
const REACT = 'react';
const VUE = 'vue';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get number of votes for all frameworks
app.get('/api/frameworks', async (req, res, next) => {
    const angular = await User.findAll({ where: { vote: ANGULAR } });
    const ember = await User.findAll({ where: { vote: EMBER } });
    const react = await User.findAll({ where: { vote: REACT } });
    const vue = await User.findAll({ where: { vote: VUE } });
    res.send([
        { name: ANGULAR, count: angular.length },
        { name: EMBER, count: ember.length },
        { name: REACT, count: react.length },
        { name: VUE, count: vue.length }
    ])
    next();
})

// Get number of votes for a given framework
app.get('/api/frameworks/:framework', async (req, res, next) => {
    const vote = req.params.framework;
    const usersThatVotedForThisFramework = await User.findAll({ where: { vote } })
    res.send({count: usersThatVotedForThisFramework.length})
    next();
});

// Creates a new user
app.post('/api/user', (req, res, next) => {
    User.create(req.body);
    next();
});

db.sync();
app.listen(3000, () =>
    console.log('Listening on port 3000')
);