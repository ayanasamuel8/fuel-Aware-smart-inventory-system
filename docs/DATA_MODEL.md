# Data Model

## Goal

Provide a simple shared model for backend, analytics, and frontend.

## Tables

Recommended storage target:

- Supabase Postgres for canonical tables
- Supabase Realtime subscriptions for latest-state and alert updates if needed by the dashboard

## `vehicles`

Purpose:

- static metadata for each vehicle

Fields:

- `vehicleId`
- `plateNumber`
- `label`
- `tankCapacityLiters`
- `assignedDriver`
- `status`
- `createdAt`

## `devices`

Purpose:

- map hardware devices to vehicles

Fields:

- `deviceId`
- `vehicleId`
- `firmwareVersion`
- `lastSeenAt`
- `status`

## `telemetry_raw`

Purpose:

- preserve received payloads for debugging

Fields:

- `telemetryId`
- `receivedAt`
- `payload`
- `source`

## `telemetry_normalized`

Purpose:

- cleaned time-series records for system use

Fields:

- `telemetryId`
- `vehicleId`
- `deviceId`
- `timestamp`
- `fuelLevelLiters`
- `fuelLevelPercent`
- `latitude`
- `longitude`
- `speedKph`
- `engineStatus`

## `vehicle_latest_state`

Purpose:

- fast UI reads

Fields:

- `vehicleId`
- `lastSeenAt`
- `fuelLevelLiters`
- `fuelLevelPercent`
- `latitude`
- `longitude`
- `engineStatus`
- `deviceStatus`
- `currentAlertLevel`

## `alerts`

Purpose:

- suspicious conditions and warnings

Fields:

- `alertId`
- `vehicleId`
- `type`
- `severity`
- `status`
- `message`
- `evidence`
- `createdAt`
- `resolvedAt`

## `trips`

Purpose:

- aggregated movement sessions

Fields:

- `tripId`
- `vehicleId`
- `startTime`
- `endTime`
- `distanceKm`
- `fuelUsedLiters`
- `avgSpeedKph`

## `predictions`

Purpose:

- forecast and anomaly outputs

Fields:

- `predictionId`
- `vehicleId`
- `type`
- `value`
- `confidence`
- `generatedAt`

## Modeling Rules

- timestamps must use ISO 8601
- liters and kilometers are the default units
- every record must link to `vehicleId`
- raw input must remain unchanged after receipt

## MVP Data Rule

If a field is not essential for MVP behavior, do not block implementation waiting for it.
