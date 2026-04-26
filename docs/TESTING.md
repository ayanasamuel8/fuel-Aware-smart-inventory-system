# Testing Strategy

## Objective

Find integration problems early and make the final demo predictable.

## Testing Layers

## 1. Hardware Validation

Owned by:

- ECE

Checks:

- sensor produces expected range
- GPS coordinates update
- ESP32 package format matches contract
- transmission works at expected interval

Artifacts:

- short test report
- sample payload logs

## 2. Backend Unit Tests

Owned by:

- CSE

Checks:

- payload validation
- alert rule evaluation
- trip calculation helpers
- API error handling

## 3. Frontend Component and Integration Tests

Owned by:

- SE

Checks:

- latest vehicle state renders
- alert list renders
- loading/error states work

## 4. Contract Tests

Shared between:

- CSE and SE

Checks:

- mock API response matches frontend expectations
- simulator payload matches ingestion expectations

## 5. End-to-End Demo Tests

Shared

Checks:

- telemetry enters system
- latest dashboard updates
- alert triggers when theft scenario simulated
- history page shows records

## Required Test Scenarios

### Scenario A: Normal Operation

- steady fuel decrease
- changing GPS points
- no theft alert

### Scenario B: Suspicious Fuel Drop

- sudden fuel decrease over short time
- alert created
- dashboard shows alert

### Scenario C: Low Fuel

- fuel falls below threshold
- warning created

### Scenario D: Device Stale

- telemetry stops
- device offline/stale warning shown

### Scenario E: Refill

- fuel increases suddenly
- refill event created if implemented

## Test Evidence to Save

- screenshots
- sample logs
- payload examples
- short demo video if possible

## Final Demo Safety Rule

Always prepare a simulator-based fallback demo in case hardware fails live.

