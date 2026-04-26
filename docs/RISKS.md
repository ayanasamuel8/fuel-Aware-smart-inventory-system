# Risks and Mitigations

## 1. Hardware Not Ready on Time

Risk:

- sensor or GSM integration may slip

Mitigation:

- simulator is mandatory in Week 1
- backend and frontend proceed using mock telemetry

## 2. Poor Network Connectivity

Risk:

- telemetry may be delayed or lost

Mitigation:

- support retries if feasible
- show last-seen status
- demo with stable local or controlled network

## 3. AI Feature Overreach

Risk:

- team spends too much time on advanced models

Mitigation:

- ship rule-based anomaly detection first
- keep AI as enhancement, not dependency

## 4. Integration Happens Too Late

Risk:

- separate modules work alone but fail together

Mitigation:

- daily integration check
- simulator-driven end-to-end path from Week 1

## 5. Scope Creep

Risk:

- too many features dilute MVP

Mitigation:

- obey `P0/P1/P2`
- freeze MVP before adding stretch features

## 6. Unclear Ownership

Risk:

- tasks stall because nobody is accountable

Mitigation:

- one owner per task
- use ownership matrix

## 7. Weak Presentation Readiness

Risk:

- system works but demo is confusing

Mitigation:

- maintain demo script
- prepare screenshots and backup flow

