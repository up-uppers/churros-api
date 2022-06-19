const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/', productController.salvar);
router.get('/', productController.listar);
router.get('/:id', productController.buscarPorId);
router.put('/:id', productController.atualizar);
router.delete('/:id', productController.excluir);

module.exports = router;