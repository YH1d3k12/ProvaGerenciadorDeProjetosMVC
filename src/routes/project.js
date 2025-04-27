const express = require('express');
const authMiddleware = require('../middleware/auth.js');
const ProjectController = require('../controllers/project');

const controller = new ProjectController();
const router = express.Router();

router.get('/', authMiddleware, controller.GetProjects);
router.get('/:id', authMiddleware, controller.GetProjectById);
router.post('/', authMiddleware, controller.CreateProject);
router.put('/:id', authMiddleware, controller.UpdateProject);
router.delete('/:id', authMiddleware, controller.DeleteProject);

module.exports = router;
