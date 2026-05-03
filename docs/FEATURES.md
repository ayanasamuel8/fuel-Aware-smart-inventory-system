# Feature Specification

This document defines the complete feature map, ownership boundaries, MVP priority, and implementation notes.

## Feature Classification

- `P0`: Must exist for demo and grading
- `P1`: Important if time allows after P0 stabilizes
- `P2`: Stretch only

## System-Wide Product Features

### 1. Telemetry Ingestion

Priority: `P0`

Description:

- Receive fuel level, timestamp, and device identifier
- Receive GPS coordinates and timestamp
- Receive engine status or engine proxy signal if available
- Accept data from real hardware and simulated input

Acceptance:

- Backend accepts telemetry through the documented ingestion endpoint; any Supabase usage remains an internal persistence detail behind that endpoint
- Invalid payloads are rejected clearly
- Valid payloads appear in storage and dashboard

Primary Ownership:

- ECE: device payload production
- CSE: ingestion API, validation, persistence
- SE: display latest telemetry

### 2. Real-Time Fuel Monitoring

Priority: `P0`

Description:

- Show current fuel level in liters or calibrated units
- Show percentage if tank capacity is known
- Show last update timestamp
- Show sensor freshness status

Acceptance:

- Dashboard refreshes on new data
- User can identify stale telemetry

Ownership:

- ECE: sensor reading quality
- CSE: normalized data
- SE: visualization

### 3. Real-Time Location Tracking

Priority: `P0`

Description:

- Show latest location
- Show movement history for recent points
- Associate location with vehicle ID

Acceptance:

- Map or coordinate display updates as telemetry arrives
- History can be queried for a chosen time range

Ownership:

- ECE: GPS feed
- CSE: history storage and query
- SE: map/history UI

### 4. Rule-Based Fuel Theft Detection

Priority: `P0`

Description:

- Detect sudden fuel drop
- Detect fuel drop while engine is OFF
- Detect abnormal loss over short time window

Acceptance:

- Rules are documented and configurable
- Alert generated and stored when rule triggers
- UI shows current and historical alerts

Ownership:

- CSE primary
- ECE supports signal accuracy
- SE exposes alerts clearly

### 5. Alerting

Priority: `P0`

Description:

- Create low fuel alerts
- Create suspected theft alerts
- Create device offline/stale data alerts
- Optional SMS notification if hardware path is available

Acceptance:

- Alert entity stored with severity, type, vehicle, time, status
- User can acknowledge or clear alert in UI if implemented

Ownership:

- CSE: alert generation and persistence
- SE: alert center UI
- ECE: optional GSM/SMS integration

### 6. Vehicle/Trip History

Priority: `P0`

Description:

- View historical telemetry
- View trips by time range
- Estimate distance and fuel usage per trip

Acceptance:

- User can retrieve at least recent history
- Trip summary works for demo vehicle

Ownership:

- CSE: trip aggregation logic
- SE: trip/history views

### 7. Dashboard and User Views

Priority: `P0`

Description:

- Admin dashboard
- Vehicle status card
- Alert panel
- Telemetry timeline
- Trip history page

Acceptance:

- Main dashboard usable on laptop screen during demo
- Mobile-friendly web layout acceptable for MVP

Ownership:

- SE primary
- CSE provides API support

### 8. Simulator Mode

Priority: `P0`

Description:

- Mock telemetry generator for fuel, GPS, engine state, and events
- Supports development before hardware is ready

Acceptance:

- System can run complete demo without physical hardware

Ownership:

- CSE primary
- ECE validates realism of payload shape and values
- SE uses for UI development

### 9. Device Registration and Identity

Priority: `P1`

Description:

- Map a device to vehicle metadata
- Store tank capacity, label, assigned driver, and status

Acceptance:

- Vehicle metadata can be created and linked to telemetry stream

Ownership:

- CSE
- SE for management form if time permits

### 10. Fuel Refill Detection

Priority: `P1`

Description:

- Detect sharp upward fuel changes
- Record refill event amount and timestamp

Acceptance:

- Refill events visible in history

Ownership:

- CSE
- ECE supports sensor calibration

### 11. AI-Assisted Anomaly Detection

Priority: `P1`

Description:

- Use historical data to flag unusual consumption patterns
- Compare current behavior with baseline

Acceptance:

- Model output can be explained during presentation
- Falls back safely when data is insufficient

Ownership:

- CSE primary

### 12. Fuel Consumption Forecast

Priority: `P1`

Description:

- Estimate future fuel needs based on previous usage
- Show simple forecast or trend line

Acceptance:

- Output visible and understandable
- Forecast limitations documented

Ownership:

- CSE primary
- SE presents result

### 13. Offline Buffering and Sync

Priority: `P1`

Description:

- Store telemetry locally during network outage
- Sync after connection returns

Acceptance:

- At minimum, simulator or device can retry unsent data

Ownership:

- ECE for device-side buffering
- CSE for idempotent ingestion

### 14. Multi-Role User Access

Priority: `P1`

Description:

- Admin
- Driver
- Viewer

Acceptance:

- For MVP, a simplified admin-only mode is acceptable

Ownership:

- CSE authentication
- SE screens/guards

### 15. Geofencing

Priority: `P2`

### 16. Fuel-Aware Delivery Recommendation

Priority: `P2`

Description:

- Suggest proceed/delay/refuel based on fuel level, trip estimate, and risk threshold

Ownership:

- CSE logic
- SE decision display

## Department-Level Feature Breakdown

## ECE Feature Set

### ECE-P0

- Fuel sensor wiring and reading
- GPS acquisition
- ESP32 firmware loop
- Telemetry packet format generation
- GSM/network transmission or serial simulation bridge
- Timestamp strategy
- Device power and boot handling
- Manual test procedure for each hardware signal

### ECE-P1

- Engine state sensing
- Local retry buffer
- Anti-tamper signal
- SMS path validation
- Sensor calibration routine

### ECE Deliverables

- Wiring/block diagram
- Pin mapping
- Firmware README
- Sample payload examples
- Test log with expected ranges

## CSE Feature Set

### CSE-P0

- Backend service skeleton
- Telemetry ingestion API
- Payload validation
- Telemetry persistence
- Alert rule engine
- History query endpoints
- Simulator
- Demo seed data and sample scripts

### CSE-P1

- Forecasting model
- AI anomaly scoring
- Device/vehicle registry
- Authentication
- Report endpoints

### CSE Deliverables

- API docs
- Environment variable template
- Database schema or table spec
- Postman/Bruno collection if used
- Rule thresholds configuration

## SE Feature Set

### SE-P0

- Design system light baseline
- Main dashboard
- Vehicle detail page
- Alerts view
- Trip/history view
- Loading/error/empty states
- Simulator-compatible data hooks

### SE-P1

- Mobile app screens
- Role-based views
- Acknowledge/resolve alerts
- Better analytics charts

### SE Deliverables

- UI flow
- Screen list
- Component ownership
- Integration checklist

## Decoupling Rules

To avoid blocking:

- ECE must publish stable sample payloads before hardware is finished.
- CSE must provide a simulator before live hardware integration.
- SE must build against mock JSON/API contracts first, not wait for live backend.
- Any team can continue using fixture data if another module is incomplete.

## Final MVP Scope Lock

The approved MVP scope is:

- Single vehicle
- Real or simulated telemetry
- Live dashboard
- Alerting
- History
- Basic rule-based analytics

Everything else is secondary until this works end to end.
