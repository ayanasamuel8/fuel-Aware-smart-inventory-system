require('dotenv').config();
const express = require('express');

const telemetryRoutes = require('./routes/telemetry');
const vehicleRoutes = require('./routes/vehicles');

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/vehicles', vehicleRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Fuel-Aware backend running on port ${PORT}`);
});

module.exports = app;
