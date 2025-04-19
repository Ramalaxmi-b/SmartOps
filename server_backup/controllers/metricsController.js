// server/controllers/metricsController.js
const Metric = require('../models/Metric');

// Get all metrics
/*exports.getMetrics = async (req, res, next) => {
  try {
    const metrics = await Metric.find();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
};*/
export const getMetrics = async (req, res) => {
  try {
    const metrics = await Metric.find().sort({ timestamp: -1 });

    // Force fresh data (disable caching)
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching metrics" });
  }
};


// Create a new metric
exports.createMetric = async (req, res, next) => {
  try {
    const { name, value } = req.body;
    const newMetric = new Metric({ name, value });
    const savedMetric = await newMetric.save();
    res.status(201).json(savedMetric);
  } catch (error) {
    next(error);
  }
};
