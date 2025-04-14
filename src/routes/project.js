const express = require('express');
const ProjectController = require('../controllers/project');

const router = express.Router();

router.post('/', ProjectController.create);
router.get('/', ProjectController.read);
router.get('/:id', ProjectController.readOne);
router.put('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);

module.exports = router;