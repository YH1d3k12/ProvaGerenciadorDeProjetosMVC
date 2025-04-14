const { Sequelize } = require('sequelize');
const { development } = require('../config/config');

const db = new Sequelize(development);

db.sync()
    .then(() => {
        console.log('Connection successfull');
    })
    .catch((err) => {
        console.error(err.message);
    });

module.exports = db;
