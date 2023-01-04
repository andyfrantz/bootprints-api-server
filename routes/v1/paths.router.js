const express = require('express');

const validateObjectId = require('../../middleware/validateObjectId.middleware');
const {
    getAllPathsHandler,
    getPathHandler,
    deletePathHandler,
    createPathHandler,
    updatePathHandler,
} = require('../../controllers/path.controller');

const router = express.Router();

router.patch('/:id', updatePathHandler);
router.get('/:id', validateObjectId, getPathHandler);
router.delete('/:id', validateObjectId, deletePathHandler);
router.post('', createPathHandler);
router.get('', getAllPathsHandler);


module.exports = router;
