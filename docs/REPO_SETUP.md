# Repository Setup

This document defines the recommended repo structure and initial setup steps.

## Recommended Structure

```text
integrated/
  docs/
  hardware/
    firmware/
    diagrams/
    tests/
  backend/
    src/
    tests/
  frontend-web/
    src/
    public/
  mobile/
    lib/
  scripts/
  .github/
    workflows/
    pull_request_template.md
```

## Setup Steps

1. Initialize Git repository
2. Create GitHub repository
3. Add branch protection to `main`
4. Create issue labels
5. Add PR template
6. Add CI workflows for backend and frontend
7. Add `.env.example` files for backend and frontend
8. Add simulator script early

## Recommended Initial Branches

- `main`
- optional short-lived feature branches only

Avoid long-running branches by department.

Bad:

- `backend-team`
- `frontend-team`

Good:

- small feature branches merged frequently

## Initial Non-Code Files To Add

- `.gitignore`
- `README.md`
- `LICENSE` if required by team
- backend `.env.example`
- frontend `.env.example`
- PR template
- issue templates if time allows

## Suggested First Technical Tasks

1. repo bootstrap
2. docs merge
3. telemetry schema
4. backend skeleton
5. frontend skeleton
6. simulator
7. hardware sample payload

## Required Shared Conventions

- UTC timestamps in storage
- liters as fuel unit
- kilometers as distance unit
- same vehicle and device ID format everywhere

