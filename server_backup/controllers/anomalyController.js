// if you don’t have this file yet, create it
// server/controllers/anomalyController.js

// Dummy anomaly logic you already have:
exports.detectAnomaly = async (req, res) => {
  const { value } = req.body;
  const message = value > 100
    ? 'Anomaly detected!'
    : 'No anomaly detected';
  res.json({ message });
};

// Serve synthetic CSV (or JSON) data:
exports.getSyntheticData = async (req, res) => {
  // Example static CSV; replace with your real generator
  const csv = [
    'name,value',
    'CPU,30',
    'Memory,60',
    'Disk,80',
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.send(csv);
};
