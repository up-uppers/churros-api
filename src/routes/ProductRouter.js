const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/', AuthMiddleware.checkToken, productController.create);
router.get('/', AuthMiddleware.checkToken, productController.list);
router.get('/:id', AuthMiddleware.checkToken, productController.find);
router.put('/:id', AuthMiddleware.checkToken, productController.update);
router.delete('/:id', AuthMiddleware.checkToken, productController.delete);

module.exports = router;