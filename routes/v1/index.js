const express = require('express');

const router = express.Router();

router.use('/paths', require('./paths.router'));
router.use('/users', require('./users.router'));
router.use('/auth', require('./auth.router'));

module.exports = router;
