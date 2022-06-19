const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/:id', UserController.find);

module.exports = router;