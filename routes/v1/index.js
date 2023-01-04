const express = require('express');

const router = express.Router();

router.use('/paths', require('./paths.router'));

module.exports = router;
