'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./db/db');
const { User } = require('./db/models');

const app = express();

// Creates sessionID
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Allows me to read JSONs in request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// // Allows front end to access the API
// app.use(cors({
//     origin: 'https://framework-dashboard-89a5d.firebaseapp.com/',
//     optionsSuccessStatus: 200
// }))

const ANGULAR = 'angular';
const EMBER = 'ember';
const REACT = 'react';
const VUE = 'vue';

app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get number of votes for all frameworks
app.get('/api/frameworks', cors(), async (req, res, next) => {
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
app.get('/api/frameworks/:framework', cors(), async (req, res, next) => {
    const vote = req.params.framework;
    const usersThatVotedForThisFramework = await User.findAll({ where: { vote } })
    res.send({ count: usersThatVotedForThisFramework.length })
    next();
});

// Creates a new user
app.put('/api/user', cors(), async (req, res, next) => {
    const { body, sessionID } = req;
    const { email, vote } = body;
    User.findOne({ where: { email } }).then(user => {
        if (user) {
            if (user.sessionID !== sessionID) {
                User.update({ vote }, { where: { email } });
            }
        } else {
            User.create({ email, vote, sessionID });
        }
    })
    next();
});

db.sync();
app.listen(3000, () =>
    console.log('Listening on port 3000')
);