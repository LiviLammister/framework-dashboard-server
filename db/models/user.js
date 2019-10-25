'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
    },
    vote: {
        type: Sequelize.ENUM('angular', 'ember', 'react', 'vue')
    },
    sessionID: {
        type: Sequelize.STRING
    }
});

module.exports = User;