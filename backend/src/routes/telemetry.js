const express = require('express');
const supabase = require('../supabaseClient');

const router = express.Router();

// POST /api/telemetry - ingest raw telemetry from device or simulator
router.post('/', async (req, res) => {
  const {
    schemaVersion,
    deviceId,
    vehicleId,
    timestamp,
    fuelLevelLiters,
    fuelLevelPercent,
    latitude,
    longitude,
    speedKph,
    engineStatus,
    source,
  } = req.body;

  const requiredFields = ['schemaVersion', 'deviceId', 'vehicleId', 'timestamp', 'fuelLevelLiters', 'latitude', 'longitude', 'source'];
  for (const field of requiredFields) {
    if (req.body[field] === undefined || req.body[field] === null) {
      return res.status(400).json({
        accepted: false,
        error: { code: 'INVALID_PAYLOAD', message: `${field} is required` },
      });
    }
  }

  // Store raw payload
  const { data: rawData, error: rawError } = await supabase
    .from('telemetry_raw')
    .insert([{ receivedAt: new Date().toISOString(), payload: req.body, source }])
    .select('telemetryId')
    .single();

  if (rawError) {
    return res.status(500).json({ accepted: false, error: { code: 'DB_ERROR', message: rawError.message } });
  }

  const telemetryId = rawData.telemetryId;

  // Store normalized record
  const { error: normError } = await supabase.from('telemetry_normalized').insert([
    {
      telemetryId,
      vehicleId,
      deviceId,
      timestamp,
      fuelLevelLiters,
      fuelLevelPercent: fuelLevelPercent ?? null,
      latitude,
      longitude,
      speedKph: speedKph ?? null,
      engineStatus: engineStatus ?? null,
    },
  ]);

  if (normError) {
    return res.status(500).json({ accepted: false, error: { code: 'DB_ERROR', message: normError.message } });
  }

  // Upsert latest vehicle state — preserve currentAlertLevel if already set
  const { error: stateError } = await supabase.from('vehicle_latest_state').upsert(
    [
      {
        vehicleId,
        lastSeenAt: timestamp,
        fuelLevelLiters,
        fuelLevelPercent: fuelLevelPercent ?? null,
        latitude,
        longitude,
        engineStatus: engineStatus ?? null,
        deviceStatus: 'online',
      },
    ],
    { onConflict: 'vehicleId', ignoreDuplicates: false }
  );

  if (stateError) {
    return res.status(500).json({ accepted: false, error: { code: 'DB_ERROR', message: stateError.message } });
  }

  return res.status(201).json({ accepted: true, telemetryId, message: 'telemetry stored' });
});

module.exports = router;
