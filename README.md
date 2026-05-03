# Fuel-Aware Smart Inventory System

Integrated Engineering Team Project for Adama Science and Technology University.

This repository contains the full project workspace for the Fuel-Aware Smart Inventory System, including:

- project documentation
- hardware/firmware work
- backend services
- frontend web application
- mobile application
- Supabase-backed data layer planning
- CI/CD and collaboration rules

## Project Goal

Build a functional prototype that integrates:

- fuel sensing
- GPS tracking
- telemetry ingestion
- alerting and analytics
- dashboard visualization
- fuel-aware operational decision support

The project is intentionally organized for fast parallel execution across:

- ECE
- CSE
- SE

## Repository Structure

```text
.
├── .github/
├── backend/
├── docs/
├── frontend-web/
├── hardware/
├── mobile/
└── scripts/
```

## Working Model

This repository uses a unified monorepo approach.

Why:

- one source of truth
- easier integration
- smaller and clearer PRs
- faster end-to-end testing
- less contract drift across teams

## Start Here

Read these first:

1. [Project Charter](./docs/PROJECT_CHARTER.md)
2. [Feature Specification](./docs/FEATURES.md)
3. [Architecture](./docs/ARCHITECTURE.md)
4. [Execution Workflow](./docs/WORKFLOW.md)
5. [Ownership Matrix](./docs/OWNERSHIP_MATRIX.md)

## MVP Scope

The MVP is complete when the team can demonstrate:

- telemetry from hardware or simulator
- real-time vehicle fuel and location visibility
- basic rule-based alerting
- dashboard and history views
- one end-to-end single-vehicle prototype

The current project documentation assumes Supabase for the shared database and real-time layer.

## Core Rules

- keep PRs small
- use stacked PRs for dependent work
- do not block on another team if a mock can be used
- update docs when contracts change
- prioritize MVP over stretch features

## Local Setup

The implementation folders are intentionally ready for each team to initialize independently:

- `backend/`
- `frontend-web/`
- `hardware/`
- `mobile/`
- `scripts/`

Repository setup guidance is in [docs/REPO_SETUP.md](./docs/REPO_SETUP.md).

## Contribution

Before contributing, read:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [docs/WORKFLOW.md](./docs/WORKFLOW.md)
