const Project = require('../models/project');

class ProjectController {
    async GetProjects(req, res) {
        try {
            const projects = await Project.findAll();
            res.status(200).json({ data: projects });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async GetProjectById(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const project = await Project.findByPk(req.params.id);

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            res.status(200).json({ data: project });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async CreateProject(req, res) {
        try {
            const data = {
                name: req.body.name,
                description: req.body.description
            }

            const result = await Project.create(data);

            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async UpdateProject(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const project = await Project.findByPk(req.params.id);

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            const data = {
                name: req.body.name,
                description: req.body.description
            }

            const result = await Project.update(data, { where: { id: req.params.id } });
            res.status(200).json({ result: result, message: "Project updated successfully" });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async DeleteProject(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const project = await Project.findByPk(req.params.id);

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            const result = await Project.destroy({ where: { id: req.params.id } });
            res.status(200).json({ result: result, message: "Project deleted successfully" });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = ProjectController
