const express = require('express');

const {
  authenticateUserHandler,
} = require('../../controllers/user.controller');

const router = express.Router();

router.post('/login', authenticateUserHandler);

module.exports = router;
