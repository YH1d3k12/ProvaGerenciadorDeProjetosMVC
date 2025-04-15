const express = require('express');
const TaskController = require('../controllers/task');

const controller = new TaskController();
const router = express.Router();

router.get('/', controller.GetTasks);
router.get('/:id', controller.GetTaskById);
router.post('/', controller.CreateTask);
router.put('/:id', controller.UpdateTask);
router.delete('/:id', controller.DeleteTask);

module.exports = router;
