const express = require('express');
const authMiddleware = require('../middleware/auth.js');
const TaskController = require('../controllers/task');

const controller = new TaskController();
const router = express.Router();

router.get('/', authMiddleware, controller.GetTasks);
router.get('/:id', authMiddleware, controller.GetTaskById);
router.post('/', authMiddleware, controller.CreateTask);
router.put('/:id', authMiddleware, controller.UpdateTask);
router.delete('/:id', authMiddleware, controller.DeleteTask);

module.exports = router;
