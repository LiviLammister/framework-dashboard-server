'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    vote: {
        type: Sequelize.ENUM('angular', 'ember', 'react', 'vue')
    }
});

module.exports = User;