const express = require('express');
const router = express.Router();
const { storeController } = require('../controller');
const {
    getStore,
    addStore,
    editStore,
    deleteStore
} = storeController;

router.get('/get', getStore);
router.post('/add', addStore);
router.patch('/edit/:id', editStore);
router.delete('/delete/:id', deleteStore);

module.exports = router;