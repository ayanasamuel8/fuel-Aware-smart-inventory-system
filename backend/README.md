# Backend

Fuel-Aware Smart Inventory System — Backend API service.

## Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** Supabase (PostgreSQL)

## Project Structure

```text
backend/
├── index.js                        # Entry point
├── src/
│   ├── app.js                      # Express app setup
│   ├── supabase.js                 # Supabase client
│   ├── middleware/
│   │   └── validateTelemetry.js   # Payload validation middleware
│   └── routes/
│       └── telemetry.js           # POST /api/telemetry route
└── tests/
    └── telemetry.test.js          # Unit/integration tests
```

## Setup

1. Copy the example environment file and fill in your Supabase credentials:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

## Environment Variables

| Variable                   | Description                          |
|----------------------------|--------------------------------------|
| `SUPABASE_URL`             | Supabase project URL                 |
| `SUPABASE_SERVICE_ROLE_KEY`| Supabase service role key (secret)   |
| `PORT`                     | Server port (default: 3000)          |

## API Endpoints

### `POST /api/telemetry`

Receives telemetry data from hardware devices or simulators and persists it to the database.

**Required fields:**

| Field             | Type   | Description                            |
|-------------------|--------|----------------------------------------|
| `schemaVersion`   | string | Payload schema version (e.g. `"1.0"`) |
| `deviceId`        | string | Hardware device ID (e.g. `"ESP32-001"`) |
| `vehicleId`       | string | Vehicle identifier (e.g. `"V001"`)    |
| `timestamp`       | string | ISO 8601 timestamp                     |
| `fuelLevelLiters` | number | Current fuel level in liters           |
| `latitude`        | number | GPS latitude                           |
| `longitude`       | number | GPS longitude                          |
| `source`          | string | Data source (`"hardware"` or `"simulator"`) |

**Optional fields:** `fuelLevelPercent`, `speedKph`, `engineStatus`

**Example request:**

```json
{
  "schemaVersion": "1.0",
  "deviceId": "ESP32-001",
  "vehicleId": "V001",
  "timestamp": "2026-04-26T10:00:00Z",
  "fuelLevelLiters": 32.4,
  "latitude": 8.5512,
  "longitude": 39.2694,
  "source": "hardware"
}
```

**Success response (200):**

```json
{ "accepted": true }
```

**Validation error response (400):**

```json
{
  "accepted": false,
  "error": {
    "code": "INVALID_PAYLOAD",
    "message": "vehicleId is required"
  }
}
```

### `GET /health`

Returns server health status.

**Response (200):**

```json
{ "status": "ok" }
```

## Running Tests

```bash
npm test
```

## Database Tables

The endpoint writes to three tables in Supabase:

| Table                  | Purpose                                          |
|------------------------|--------------------------------------------------|
| `telemetry_raw`        | Raw JSON payload preserved for debugging         |
| `telemetry_normalized` | Structured, cleaned time-series records          |
| `vehicle_latest_state` | Latest state snapshot per vehicle (fast reads)   |

See [docs/DATA_MODEL.md](../docs/DATA_MODEL.md) for full schema details.
