const Project = require('../models/project');

class ProjectController {
    static create(req, res) {
        const { name, description } = req.body;

        const project = new Project(name, description);
        project.create();

        res.status(201).json(project);
    }

    static read(req, res) {
        const projects = Project.read();
        res.status(200).json(projects);
    }

    static readOne(req, res) {
        const { id } = req.params;

        const project = Project.readOne(parseInt(id));

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    }

    static update(req, res) {
        const { id } = req.params;
        const { name, description, } = req.body;

        const project = Project.update(parseInt(id), name, description,);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    }

    static delete(req, res) {
        const { id } = req.params;

        const result = Project.delete(parseInt(id));

        if (!result) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(204).json();
    }
}

module.exports = ProjectController
