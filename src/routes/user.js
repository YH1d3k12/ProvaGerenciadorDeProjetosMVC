const express = require('express');
const UserController = require('../controllers/user');

const controller = new UserController();
const router = express.Router();

router.get('/', controller.GetUsers);
router.get('/:id', controller.GetUserById);
router.post('/', controller.CreateUser);
router.put('/:id', controller.UpdateUser);
router.delete('/:id', controller.DeleteUser);

module.exports = router;
