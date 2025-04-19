const express = require('express');
const router = express.Router();
const {
  detectAnomaly,
  getSyntheticData
} = require('../controllers/anomalyController');

// POST /api/anomaly/detect
router.post('/detect', detectAnomaly);

// ✅ GET  /api/anomaly/synthetic-data
router.get('/synthetic-data', getSyntheticData);

module.exports = router;
