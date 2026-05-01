const express = require('express');
const validateTelemetry = require('../middleware/validateTelemetry');
const supabase = require('../supabase');

const router = express.Router();

router.post('/', validateTelemetry, async (req, res) => {
  const payload = req.body;
  const receivedAt = new Date().toISOString();

  // Insert raw JSON into telemetry_raw
  const { data: rawData, error: rawError } = await supabase
    .from('telemetry_raw')
    .insert({
      received_at: receivedAt,
      payload: payload,
      source: payload.source,
    })
    .select('id')
    .single();

  if (rawError) {
    console.error('Failed to insert into telemetry_raw:', rawError);
    return res.status(500).json({
      accepted: false,
      error: {
        code: 'STORAGE_ERROR',
        message: 'Failed to store raw telemetry',
      },
    });
  }

  const telemetryId = rawData.id;

  // Insert structured data into telemetry_normalized
  const { error: normalizedError } = await supabase
    .from('telemetry_normalized')
    .insert({
      telemetry_id: telemetryId,
      vehicle_id: payload.vehicleId,
      device_id: payload.deviceId,
      timestamp: payload.timestamp,
      fuel_level_liters: payload.fuelLevelLiters,
      fuel_level_percent: payload.fuelLevelPercent ?? null,
      latitude: payload.latitude,
      longitude: payload.longitude,
      speed_kph: payload.speedKph ?? null,
      engine_status: payload.engineStatus ?? null,
    });

  if (normalizedError) {
    console.error('Failed to insert into telemetry_normalized:', normalizedError);
    return res.status(500).json({
      accepted: false,
      error: {
        code: 'STORAGE_ERROR',
        message: 'Failed to store normalized telemetry',
      },
    });
  }

  // Upsert into vehicle_latest_state
  const { error: latestStateError } = await supabase
    .from('vehicle_latest_state')
    .upsert(
      {
        vehicle_id: payload.vehicleId,
        last_seen_at: payload.timestamp,
        fuel_level_liters: payload.fuelLevelLiters,
        fuel_level_percent: payload.fuelLevelPercent ?? null,
        latitude: payload.latitude,
        longitude: payload.longitude,
        engine_status: payload.engineStatus ?? null,
        device_status: 'online',
      },
      { onConflict: 'vehicle_id' }
    );

  if (latestStateError) {
    console.error('Failed to upsert vehicle_latest_state:', latestStateError);
    return res.status(500).json({
      accepted: false,
      error: {
        code: 'STORAGE_ERROR',
        message: 'Failed to update vehicle latest state',
      },
    });
  }

  return res.status(200).json({ accepted: true });
});

module.exports = router;
