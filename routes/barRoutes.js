// barRoutes.js
const express = require('express');
const { getBares, createBar, updateBar, deleteBar } = require('../controllers/barController');
const router = express.Router();

router.get('/', getBares);
router.post('/', createBar);
router.put('/:id', updateBar);
router.delete('/:id', deleteBar);

module.exports = router;