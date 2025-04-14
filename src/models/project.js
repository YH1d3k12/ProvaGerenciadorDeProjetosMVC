const checkEmptyParam = require('../utils/checkEmptyParam');

const projects = []

class Project {
    constructor(name, description) {
        this.id = projects.length + 1;
        this.name = name;
        this.description = description;
    }

    create() {
        projects.push(this);
    }

    static read() {
        const result = projects.map(project => {
            return {
                id: project.id,
                name: project.name,
                description: project.description
            }
        });

        return result;
    }

    static readOne(id) {
        const project = projects.find(project => project.id === id);

        if (!project) {
            return false;
        }

        return {
            id: project.id,
            name: project.name,
            description: project.description
        };
    }

    static update(id, name, description) {
        const project = projects.find(project => project.id === id);

        if (!project) {
            return false;
        }

        project.name = checkEmptyParam(name) ? project.name : name;
        project.description = checkEmptyParam(description) ? project.description : description;
        return project;
    }

    static delete(id) {
        const index = projects.findIndex(project => project.id === id);
        if (index === -1) {
            return false;
        }
        else {
            projects.splice(index, 1);
            return true;
        }
    }
}

module.exports = Project;
