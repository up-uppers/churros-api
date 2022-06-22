const express = require('express');
const ProfileController = require('../controllers/profileController');
const router = express.Router();

const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/', AuthMiddleware.checkToken, AuthMiddleware.hasPermission, ProfileController.create);

module.exports = router;