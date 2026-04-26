# API Contracts

This document defines initial contracts so teams can build independently.

## Contract Principles

- Keep payloads small and explicit
- Prefer additive evolution
- Include timestamps and IDs everywhere
- Normalize units clearly

## Canonical Vehicle Identifier

- `vehicleId`: unique vehicle ID such as `V001`
- `deviceId`: hardware device ID such as `ESP32-001`

## Telemetry Ingestion Payload

Example:

```json
{
  "schemaVersion": "1.0",
  "deviceId": "ESP32-001",
  "vehicleId": "V001",
  "timestamp": "2026-04-26T10:00:00Z",
  "fuelLevelLiters": 32.4,
  "fuelLevelPercent": 54,
  "latitude": 8.5512,
  "longitude": 39.2694,
  "speedKph": 18.5,
  "engineStatus": "ON",
  "source": "hardware"
}
```

Required fields:

- `schemaVersion`
- `deviceId`
- `vehicleId`
- `timestamp`
- `fuelLevelLiters`
- `latitude`
- `longitude`
- `source`

Optional fields:

- `fuelLevelPercent`
- `speedKph`
- `engineStatus`

## Ingestion Response

```json
{
  "accepted": true,
  "telemetryId": "tel_12345",
  "message": "telemetry stored"
}
```

## Validation Error Response

```json
{
  "accepted": false,
  "error": {
    "code": "INVALID_PAYLOAD",
    "message": "vehicleId is required"
  }
}
```

## Latest Vehicle State Response

```json
{
  "vehicleId": "V001",
  "lastSeenAt": "2026-04-26T10:00:00Z",
  "fuelLevelLiters": 32.4,
  "fuelLevelPercent": 54,
  "location": {
    "latitude": 8.5512,
    "longitude": 39.2694
  },
  "engineStatus": "ON",
  "alertStatus": "warning",
  "deviceStatus": "online"
}
```

## Alert Record

```json
{
  "alertId": "alt_001",
  "vehicleId": "V001",
  "type": "SUSPECTED_FUEL_DROP",
  "severity": "high",
  "status": "open",
  "message": "Fuel dropped by 8.0 liters in 3 minutes while engine was OFF",
  "createdAt": "2026-04-26T10:05:00Z"
}
```

## Trip Summary Record

```json
{
  "tripId": "trip_001",
  "vehicleId": "V001",
  "startTime": "2026-04-26T08:00:00Z",
  "endTime": "2026-04-26T09:00:00Z",
  "distanceKm": 24.5,
  "fuelUsedLiters": 3.4,
  "avgSpeedKph": 31.2
}
```

## Suggested Initial Endpoints

### Backend

- `POST /api/telemetry`
- `GET /api/vehicles/:vehicleId/latest`
- `GET /api/vehicles/:vehicleId/history`
- `GET /api/vehicles/:vehicleId/alerts`
- `GET /api/vehicles/:vehicleId/trips`

### Optional Admin

- `POST /api/vehicles`
- `GET /api/vehicles`

## Contract Change Policy

If any field changes:

1. update this document
2. mark whether change is additive or breaking
3. notify all team leads

