// routes/main.js
const express = require('express');
const router = express.Router();
const { getMenuHtml } = require('../views/menuTemplate');

// แสดงหน้าเมนูหลัก
router.get('/', (req, res) => {
    res.send(getMenuHtml());
});

module.exports = router;
