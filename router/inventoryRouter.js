const express = require('express');
const router = express.Router();
const { inventoryController } = require('../controller');
const {
    getInventory,
    addInventory,
    editInventory,
    deleteInventory
} = inventoryController

router.get('/get', getInventory);
router.post('/add', addInventory);
router.patch('/edit/:id', editInventory);
router.delete('/delete/:id', deleteInventory);

module.exports = router;