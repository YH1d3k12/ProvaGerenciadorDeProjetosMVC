const Task = require('../models/task');

class TaskController {
    static create(req, res) {
        const { title, status, project_id, user_id } = req.body;

        const task = new Task(title, status, project_id, user_id);
        task.create();

        res.status(201).json(task);
    }

    static read(req, res) {
        const tasks = Task.read();
        res.status(200).json(tasks);
    }

    static readOne(req, res) {
        const { id } = req.params;

        const task = Task.readOne(parseInt(id));

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    }

    static update(req, res) {
        const { id } = req.params;
        const { title, status, project_id, user_id } = req.body;

        const task = Task.update(parseInt(id), title, status, project_id, user_id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    }

    static delete(req, res) {
        const { id } = req.params;

        const result = Task.delete(parseInt(id));

        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(204).json();
    }
}

module.exports = TaskController
