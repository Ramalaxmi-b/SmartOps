// models/Metric.js
const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Metric', metricSchema);
