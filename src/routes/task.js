const express = require('express');
const TaskController = require('../controllers/task');

const router = express.Router();

router.post('/', TaskController.create);
router.get('/', TaskController.read);
router.get('/:id', TaskController.readOne);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

module.exports = router;