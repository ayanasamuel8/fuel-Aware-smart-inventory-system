# Roadmap

This roadmap is optimized for a 3-week delivery window.

## Week 1: Foundations and Contracts

Primary outcome:

- all teams can start independently

Deliverables:

- repo structure created
- docs finalized
- telemetry schema agreed
- simulator available
- backend skeleton available
- frontend skeleton available
- hardware proof of sensor read started

Exit criteria:

- sample telemetry flows through mock path
- frontend can render mock data
- no major contract ambiguity remains

## Week 2: Core MVP Build

Primary outcome:

- main product path works

Deliverables:

- telemetry ingestion works
- dashboard latest state works
- alerts generated from rule engine
- history path works
- hardware sends at least basic payload or simulator substitutes reliably

Exit criteria:

- one end-to-end demo path works for single vehicle

## Week 3: Stabilization, Demo, and Stretch

Primary outcome:

- stable integrated prototype

Deliverables:

- integration bug fixes
- UI cleanup
- analytics/basic forecast if feasible
- demo script finalized
- presentation evidence captured

Exit criteria:

- demo rehearsed
- failure fallback path prepared
- screenshots/video/logs ready

## Recommended Task Order

1. docs and contracts
2. repo bootstrap and CI
3. simulator
4. backend ingestion
5. frontend latest dashboard
6. hardware payload production
7. alert engine
8. history/trips
9. analytics
10. polish

## Scope Control Rule

If Week 2 core flow is unstable, cut all `P2` work and most `P1` work immediately.

