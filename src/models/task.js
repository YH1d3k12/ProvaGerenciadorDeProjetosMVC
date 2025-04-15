const { DataTypes } = require('sequelize');
const db = require('../database/database.js');
const Project = require('./project');
const User = require('./user');

const Task = db.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'in_progress', 'completed'],
        allowNull: false,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
    }
}, {});

Task.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project',
});
Project.hasMany(Task, {
    foreignKey: 'project_id',
    as: 'tasks',
});

module.exports = Task;
