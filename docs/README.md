# Fuel-Aware Smart Inventory System Docs

This `docs/` folder is the working source of truth for the project.

The project goal is not to build a perfect production platform. The goal is to deliver a strong, functional, demonstrable prototype under a tight deadline, with clear team boundaries and minimal blocking between ECE, CSE, and SE.

## Core Working Principle

Work in a decoupled way:

- Every team owns a clear module.
- Integration happens through stable contracts.
- Each team must be able to continue using mocks, simulators, or fixture data when another team is not ready.
- MVP scope is fixed first. Stretch features come only after MVP works end to end.

## Recommended Reading Order

1. [Project Charter](./PROJECT_CHARTER.md)
2. [Feature Specification](./FEATURES.md)
3. [Architecture](./ARCHITECTURE.md)
4. [Ownership Matrix](./OWNERSHIP_MATRIX.md)
5. [Execution Workflow](./WORKFLOW.md)
6. [Roadmap](./ROADMAP.md)
7. [API Contracts](./API_CONTRACTS.md)
8. [Data Model](./DATA_MODEL.md)
9. [Testing Strategy](./TESTING.md)
10. [Risks and Mitigations](./RISKS.md)
11. [Repository Setup](./REPO_SETUP.md)

## MVP Definition

The MVP is complete when the team can demonstrate:

- Fuel readings entering the system from hardware or simulator
- Vehicle location entering the system from hardware or simulator
- Backend receiving, storing, and exposing telemetry
- Dashboard showing latest fuel, location, and alert status
- Basic theft/anomaly detection using explicit rules
- One alert flow working end to end
- Trip and fuel event history visible in UI
- Team can demo the system for one vehicle reliably

## Stretch Features

Only start stretch features after the MVP passes integration testing:

- AI-based anomaly detection beyond rules
- Mobile app beyond essential screens
- Geofencing
- Fuel-aware delivery recommendation engine
- Multi-vehicle fleet comparison
- Advanced reporting and export

## Working Rules

- If a dependency blocks progress, replace it with a mock immediately.
- If a contract changes, update the docs in the same PR.
- If a feature cannot be finished fully, ship the smallest demonstrable vertical slice.
- Prefer simple, observable behavior over hidden complexity.

