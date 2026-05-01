const request = require('supertest');

// Mock supabase before requiring app
jest.mock('../src/supabase', () => {
  const mockSingle = jest.fn().mockResolvedValue({ data: { id: 'tel_mock_id' }, error: null });
  const mockSelect = jest.fn().mockReturnValue({ single: mockSingle });
  const mockInsertNormalized = jest.fn().mockResolvedValue({ data: null, error: null });
  const mockUpsert = jest.fn().mockResolvedValue({ data: null, error: null });

  const mockFrom = jest.fn((table) => {
    if (table === 'telemetry_raw') {
      return {
        insert: jest.fn().mockReturnValue({ select: mockSelect }),
      };
    }
    if (table === 'telemetry_normalized') {
      return { insert: mockInsertNormalized };
    }
    if (table === 'vehicle_latest_state') {
      return { upsert: mockUpsert };
    }
    return {};
  });

  return { from: mockFrom };
});

const app = require('../src/app');

const validPayload = {
  schemaVersion: '1.0',
  deviceId: 'ESP32-001',
  vehicleId: 'V001',
  timestamp: '2026-04-26T10:00:00Z',
  fuelLevelLiters: 32.4,
  latitude: 8.5512,
  longitude: 39.2694,
  source: 'hardware',
};

describe('POST /api/telemetry', () => {
  it('returns 200 with accepted:true for a valid payload', async () => {
    const res = await request(app).post('/api/telemetry').send(validPayload);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ accepted: true });
  });

  it('returns 400 when schemaVersion is missing', async () => {
    const { schemaVersion, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.code).toBe('INVALID_PAYLOAD');
    expect(res.body.error.message).toContain('schemaVersion');
  });

  it('returns 400 when deviceId is missing', async () => {
    const { deviceId, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.message).toContain('deviceId');
  });

  it('returns 400 when vehicleId is missing', async () => {
    const { vehicleId, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.message).toContain('vehicleId');
  });

  it('returns 400 when timestamp is missing', async () => {
    const { timestamp, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.message).toContain('timestamp');
  });

  it('returns 400 when fuelLevelLiters is missing', async () => {
    const { fuelLevelLiters, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.message).toContain('fuelLevelLiters');
  });

  it('returns 400 when latitude is missing', async () => {
    const { latitude, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.message).toContain('latitude');
  });

  it('returns 400 when longitude is missing', async () => {
    const { longitude, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.message).toContain('longitude');
  });

  it('returns 400 when source is missing', async () => {
    const { source, ...payload } = validPayload;
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.accepted).toBe(false);
    expect(res.body.error.message).toContain('source');
  });

  it('accepts optional fields without error', async () => {
    const payload = {
      ...validPayload,
      fuelLevelPercent: 54,
      speedKph: 18.5,
      engineStatus: 'ON',
    };
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ accepted: true });
  });
});

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
