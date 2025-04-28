const express = require('express');
const authMiddleware = require('../middleware/auth.js');
const UserController = require('../controllers/user');

const controller = new UserController();
const router = express.Router();

router.post('/login', controller.Login);
router.get('/', authMiddleware, controller.GetUsers);
router.get('/:id', authMiddleware, controller.GetUserById);
router.post('/', controller.CreateUser);
router.put('/:id', authMiddleware, controller.UpdateUser);
router.delete('/:id', authMiddleware, controller.DeleteUser);

module.exports = router;
