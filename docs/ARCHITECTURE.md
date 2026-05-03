# Architecture

## Architecture Goal

Use a modular architecture that enables parallel work, simple integration, and a reliable prototype demo.

## Design Principles

### 1. Contract First

Each module communicates through defined payloads and interfaces. Teams should not depend on each other's internal implementation details.

### 2. Replaceable Components

Hardware, simulator, backend, analytics, and frontend should be replaceable as long as the contract is preserved.

### 3. Demo Reliability Over Complexity

Choose predictable solutions that can be explained and demonstrated under time pressure.

### 4. Mock-Driven Parallel Development

Every major interface must have a mock path:

- mock telemetry
- mock alerts
- mock historical data

### 5. Single Source of Truth for Telemetry

Raw telemetry must land in one canonical storage layer before downstream processing.

## High-Level Architecture

```text
Device Layer
  Fuel Sensor + GPS + ESP32 + GSM
        |
        v
Ingestion Layer
  HTTP endpoint and/or Supabase write path
        |
        v
Core Backend Layer
  Validation
  Normalization
  Storage
  Alert rule engine
  History/trip aggregation
        |
        +------------------+
        |                  |
        v                  v
Analytics Layer         Application API Layer
  anomaly logic         dashboard endpoints
  forecasting           alerts endpoints
                        history endpoints
        |                  |
        +---------+--------+
                  |
                  v
Frontend Layer
  React web dashboard
  Optional Flutter mobile app
```

## Recommended MVP Architecture Decision

For the 3-week deadline, the simplest architecture is:

- Supabase as shared database and real-time data layer
- Node.js backend for validation, rules, and API aggregation
- Python analytics as a separate script or service called asynchronously
- React dashboard as main presentation layer
- Flutter mobile app only if time remains after web MVP is stable

Reason:

- Fast setup
- Managed Postgres plus real-time subscriptions
- Lower integration overhead
- Works with both simulator and hardware
- Clear SQL schema for analytics and reporting

## Logical Modules

## 1. Device Module

Responsibilities:

- Read sensor inputs
- Build telemetry packet
- Attach device ID and timestamp
- Send payload
- Retry failed send if possible

Owned by:

- ECE

Output Contract:

- Fuel telemetry payload
- GPS payload
- Engine state field if available

## 2. Simulator Module

Responsibilities:

- Emit mock telemetry
- Simulate normal driving, theft, refill, and offline conditions

Owned by:

- CSE

Consumers:

- CSE backend
- SE frontend
- integration testing

## 3. Ingestion Module

Responsibilities:

- Receive telemetry
- Validate schema
- Reject malformed data
- Normalize units and timestamps
- Store raw and processed records

Owned by:

- CSE

## 4. Rules and Alert Module

Responsibilities:

- Evaluate suspicious fuel drops
- Evaluate low fuel threshold
- Evaluate stale device condition
- Generate alert records

Owned by:

- CSE

## 5. Analytics Module

Responsibilities:

- Aggregate consumption trends
- Generate anomaly scores
- Estimate future consumption

Owned by:

- CSE

Architecture Note:

- Keep this module optional in runtime.
- Backend must still work when analytics is unavailable.

## 6. Dashboard Module

Responsibilities:

- Present current system state
- Show latest vehicle metrics
- Display alerts and history
- Show analytics when available

Owned by:

- SE

## Data Flow

### Real-Time Path

1. Device or simulator emits telemetry
2. Ingestion validates and stores event
3. Rule engine evaluates event
4. Alert and latest-state records update
5. Frontend subscribes or fetches latest state

### Historical Path

1. Telemetry stored as time-series records
2. Aggregation job or on-demand query produces trip/history summaries
3. Frontend queries summaries for charts and tables

### Analytics Path

1. Historical records exported or queried
2. Python job calculates features and output
3. Results stored as prediction/anomaly records
4. Dashboard displays them if available

## Storage Strategy

Use separated logical tables:

- `vehicles`
- `devices`
- `telemetry_raw`
- `telemetry_normalized`
- `vehicle_latest_state`
- `alerts`
- `trips`
- `predictions`
- `users`

Reason:

- Clear ownership
- Easier debugging
- Raw data preserved even if normalization logic changes

## Interface Stability Rules

- Raw telemetry schema version must be tracked.
- Breaking changes require contract update in docs before merge.
- Frontend-facing API must not expose unstable internal fields casually.
- Additive changes are preferred over breaking changes.

## Fault Tolerance Strategy

Prototype-level resilience should include:

- backend validation errors logged
- duplicate telemetry tolerated with idempotency key if possible
- stale device detection when updates stop
- simulator fallback available during hardware issues

## Security Principles for MVP

- Secret keys never committed
- Basic authenticated admin access if feasible
- Device write endpoints protected with token or shared secret if feasible
- Audit timestamps on alerts and major actions

## Deployment Architecture

Recommended prototype environments:

- Frontend: Vercel, Netlify, or another static host
- Backend: Render, Railway, or local demo server
- Database/realtime: Supabase
- Analytics: local job, cron, or callable backend hook

## Architecture Constraints

- Hardware may be unstable early
- Connectivity may be poor
- Training data for AI will be limited
- Team time is short

Because of this, the architecture must support:

- simulator-first development
- rule-based baseline behavior
- thin but clear contracts

## Final Architecture Rule

No team should block another team by saying "our part is not ready."

Instead:

- ECE provides payload samples
- CSE provides mock endpoints and simulator
- SE builds on mock contracts

That is the core architecture principle for this project.
