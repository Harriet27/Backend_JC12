const express = require('express');
const router = express.Router();
const { productController } = require('../controller');
const {
    getProduct,
    addProduct,
    editProduct,
    deleteProduct
} = productController;

router.get('/get', getProduct);
router.post('/add', addProduct);
router.patch('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;