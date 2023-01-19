const express = require('express');

const {
  getStatusHandler,
  headStatusHandler,
  getInfoHandler,
  getMetricsHandler,
} = require('../controllers/health.controller');

const router = express.Router();

router.get('/status', getStatusHandler);
router.head('/status', headStatusHandler);
router.get('/info', getInfoHandler);
router.get('/metrics', getMetricsHandler);

module.exports = router;
