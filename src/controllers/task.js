const Task = require('../models/task');
const Project = require('../models/project');
const User = require('../models/user');
const checkEmptyParam = require('../utils/checkEmptyParam');

class TaskController {
    async GetTasks(req, res) {
        try {
            const tasks = await Task.findAll();
            res.status(200).json({ data: tasks });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async GetTaskById(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const task = await Task.findByPk(req.params.id);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(200).json({ data: task });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async CreateTask(req, res) {
        try {
            if (checkEmptyParam(req.body.project_id)) {
                return res.status(400).json({ message: "Project ID is missing" });
            }

            const project = await Project.findByPk(req.body.project_id);

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            if (checkEmptyParam(req.body.user_id)) {
                return res.status(400).json({ message: "User ID is missing" });
            }

            const user = await User.findByPk(req.body.user_id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const data = {
                title: req.body.title,
                status: req.body.status,
                project_id: req.body.project_id,
                user_id: req.body.user_id
            }

            const result = await Task.create(data);

            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async UpdateTask(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const task = await Task.findByPk(req.params.id);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            if (checkEmptyParam(req.body.project_id)) {
                return res.status(400).json({ message: "Project ID is missing" });
            }

            if (Project.findByPk(req.body.project_id) === null) {
                return res.status(404).json({ message: "Project not found" });
            }

            if (checkEmptyParam(req.body.user_id)) {
                return res.status(400).json({ message: "User ID is missing" });
            }

            if (User.findByPk(req.body.user_id) === null) {
                return res.status(404).json({ message: "User not found" });
            }

            const data = {
                title: req.body.title,
                status: req.body.status,
                project_id: req.body.project_id,
                user_id: req.body.user_id
            }

            const result = await Task.update(data, { where: { id: req.params.id } });
            res.status(200).json({ result: result, message: "Task updated successfully" });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async DeleteTask(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const task = await Task.findByPk(req.params.id);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            const result = await Task.destroy({ where: { id: req.params.id } });
            res.status(200).json({ result: result, message: "Task deleted successfully" });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = TaskController
