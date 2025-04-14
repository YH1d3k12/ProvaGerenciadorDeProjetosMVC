const express = require('express');
const ProjectController = require('../controllers/project');

const controller = new ProjectController();
const router = express.Router();

router.get('/', controller.GetProjects);
router.get('/:id', controller.GetProjectById);
router.post('/', controller.CreateProject);
router.put('/:id', controller.UpdateProject);
router.delete('/:id', controller.DeleteProject);

module.exports = router;
