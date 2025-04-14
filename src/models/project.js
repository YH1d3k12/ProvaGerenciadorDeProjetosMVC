const { DataTypes } = require('sequelize');
const db = require('../database/database.js');

const Project = db.define('project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_at: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        field: 'updated_at',
        type: DataTypes.DATE,
    }
}, {});

module.exports = Project;
