// routes/metricsRoutes.js
const express = require('express');
const router = express.Router();
const Metric = require('../models/Metric');

router.get('/', async (req, res) => {
  try {
    const metrics = await Metric.find().sort({ timestamp: 1 }); // ascending order
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, value } = req.body;
    const newMetric = new Metric({ name, value, timestamp: new Date() });
    await newMetric.save();
    res.status(201).json(newMetric);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add metric' });
  }
});

module.exports = router;
