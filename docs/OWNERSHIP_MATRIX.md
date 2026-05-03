# Ownership Matrix

This document prevents ambiguity about who owns what.

## Team-Level Ownership

## ECE Owns

- sensor selection and calibration
- ESP32 firmware
- GPS integration
- GSM/network hardware path
- packet generation from hardware
- hardware test validation

ECE must provide to other teams:

- payload examples
- update frequency expectations
- expected sensor range and units
- hardware limitations

## CSE Owns

- backend architecture
- ingestion and validation
- database/data model
- alerting logic
- analytics and AI
- simulator tooling
- integration scripts

CSE must provide to other teams:

- stable endpoints or Supabase write/query paths
- sample request/response bodies
- error format
- seeded development data

## SE Owns

- dashboard UI/UX
- frontend architecture
- mobile app if in scope
- user flows
- state management on client
- presentation of alerts/history/analytics

SE must provide to other teams:

- screen inventory
- expected API usage list
- visual states for success/error/loading/empty

## Cross-Team Shared Ownership

- system demo flow
- integration checklist
- documentation updates
- bug triage
- final presentation readiness

## Role Suggestions by Work Type

These are recommendations, not hard restrictions.

### Product/Coordination Lead

- one person responsible for final scope control
- one person responsible for checking daily integration

### Tech Leads

- one lead from ECE
- one lead from CSE
- one lead from SE

Responsibilities:

- unblock team decisions
- approve contract changes
- maintain quality in their module

## Ownership by Deliverable

| Deliverable | Primary Owner | Supporting Teams |
|---|---|---|
| Device payload schema | CSE | ECE, SE |
| Sensor firmware | ECE | CSE |
| Telemetry ingestion API | CSE | ECE |
| Database schema | CSE | SE |
| Dashboard UI | SE | CSE |
| Alert logic | CSE | ECE, SE |
| Demo scripts | CSE | SE |
| Hardware validation notes | ECE | CSE |
| Final integrated demo | Shared | Shared |

## Anti-Ambiguity Rule

If a task has more than one owner, then it effectively has no owner.

Every task must have:

- one primary owner
- optional reviewers/supporters
- a clear output
