const express = require('express');
const supabase = require('../supabaseClient');

const router = express.Router();

// GET /api/vehicles - list all vehicles
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('vehicles').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

// POST /api/vehicles - create a new vehicle
router.post('/', async (req, res) => {
  const { vehicleId, plateNumber, label, tankCapacityLiters, assignedDriver, status } = req.body;
  if (!vehicleId || !plateNumber) {
    return res.status(400).json({ error: 'vehicleId and plateNumber are required' });
  }
  const { data, error } = await supabase
    .from('vehicles')
    .insert([{ vehicleId, plateNumber, label, tankCapacityLiters, assignedDriver, status: status ?? 'active' }])
    .select()
    .single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(201).json(data);
});

// GET /api/vehicles/:vehicleId/latest - get latest state for a vehicle
router.get('/:vehicleId/latest', async (req, res) => {
  const { vehicleId } = req.params;
  const { data, error } = await supabase
    .from('vehicle_latest_state')
    .select('*')
    .eq('vehicleId', vehicleId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Vehicle state not found' });
    }
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

// GET /api/vehicles/:vehicleId/history - get telemetry history for a vehicle
router.get('/:vehicleId/history', async (req, res) => {
  const { vehicleId } = req.params;
  const { data, error } = await supabase
    .from('telemetry_normalized')
    .select('*')
    .eq('vehicleId', vehicleId)
    .order('timestamp', { ascending: false })
    .limit(100);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

// GET /api/vehicles/:vehicleId/alerts - get alerts for a vehicle
router.get('/:vehicleId/alerts', async (req, res) => {
  const { vehicleId } = req.params;
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('vehicleId', vehicleId)
    .order('createdAt', { ascending: false });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

// GET /api/vehicles/:vehicleId/trips - get trips for a vehicle
router.get('/:vehicleId/trips', async (req, res) => {
  const { vehicleId } = req.params;
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('vehicleId', vehicleId)
    .order('startTime', { ascending: false });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

module.exports = router;
