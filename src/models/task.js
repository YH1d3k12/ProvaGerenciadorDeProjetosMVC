const checkEmptyParam = require('../utils/checkEmptyParam');
const Project = require('./project');
const User = require('./user');

const tasks = []

class Task {
    constructor(title, status, project_id, user_id) {
        this.id = tasks.length + 1;
        this.title = title;
        this.status = status;
        this.project_id = Project.readOne(project_id) ? project_id : null;
        this.user_id = User.readOne(user_id) ? user_id : null;
    }

    create() {
        tasks.push(this);
    }

    static read() {
        const result = tasks.map(task => {
            return {
                id: task.id,
                title: task.title,
                status: task.status ? "Concluído" : "Pendente",
                project_id: Project.readOne(task.project_id),
                user_id: User.readOne(task.user_id).name
            }
        });

        return result;
    }

    static readOne(id) {
        const task = tasks.find(task => task.id === id);

        if (!task) {
            return false;
        }

        return {
            id: task.id,
            title: task.title,
            status: task.status ? "Concluído" : "Pendente",
            project_id: Project.readOne(task.project_id),
            user_id: User.readOne(task.user_id).name
        };
    }

    static update(id, title, status, project_id, user_id) {
        const task = tasks.find(task => task.id === id);

        if (!task) {
            return false;
        }

        task.title = checkEmptyParam(title) ? task.title : title;
        task.status = checkEmptyParam(status) ? task.status : status;
        task.project_id = Project.readOne(project_id) ? project_id : task.project_id;
        task.user_id = User.readOne(user_id) ? user_id : task.user_id;

        return task;
    }

    static delete(id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return false;
        }
        else {
            tasks.splice(index, 1);
            return true;
        }
    }
}

module.exports = Task;
