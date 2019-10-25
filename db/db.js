'use strict';
const Sequelize = require('sequelize');

let db;

// checks if env is Heroku, if so, sets sequelize to utilize the database hosted on heroku
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres'
    })
} else {
    db = new Sequelize(
        process.env.DATABASE_URL,
        { logging: false }
    );
}

module.exports = db;