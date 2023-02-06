const express = require('express');

const validateObjectId = require('../../middleware/validateObjectId.middleware');
const validAuthentication = require('../../middleware/authentication.middleware');
const {
  createUserHandler,
  getUserHandler,
} = require('../../controllers/user.controller');

const router = express.Router();

router.post('/signup', createUserHandler);
router.get('/:id', validAuthentication, validateObjectId, getUserHandler);

module.exports = router;
