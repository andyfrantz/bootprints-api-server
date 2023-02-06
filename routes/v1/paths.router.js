const express = require('express');

const validateObjectId = require('../../middleware/validateObjectId.middleware');
const validAuthentication = require('../../middleware/authentication.middleware');
const {
  getAllPathsHandler,
  getPathHandler,
  deletePathHandler,
  createPathHandler,
  updatePathHandler,
} = require('../../controllers/path.controller');

const router = express.Router();

router.patch('/:id', validAuthentication, validateObjectId, updatePathHandler);
router.get('/:id', validateObjectId, getPathHandler);
router.delete('/:id', validAuthentication, validateObjectId, deletePathHandler);
router.post('', validAuthentication, createPathHandler);
router.get('', getAllPathsHandler);

module.exports = router;
