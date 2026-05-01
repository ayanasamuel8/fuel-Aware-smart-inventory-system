const express = require('express');
const telemetryRouter = require('./routes/telemetry');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/telemetry', telemetryRouter);

module.exports = app;
