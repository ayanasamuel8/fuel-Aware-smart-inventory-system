const REQUIRED_FIELDS = [
  'schemaVersion',
  'deviceId',
  'vehicleId',
  'timestamp',
  'fuelLevelLiters',
  'latitude',
  'longitude',
  'source',
];

function validateTelemetry(req, res, next) {
  const body = req.body;

  for (const field of REQUIRED_FIELDS) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return res.status(400).json({
        accepted: false,
        error: {
          code: 'INVALID_PAYLOAD',
          message: `${field} is required`,
        },
      });
    }
  }

  next();
}

module.exports = validateTelemetry;
