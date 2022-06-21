const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('/:id', AuthMiddleware.checkToken, UserController.find);

module.exports = router;