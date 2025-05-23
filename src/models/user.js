const { DataTypes } = require('sequelize');
const db = require('../database/database.js');

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {});

module.exports = User;
