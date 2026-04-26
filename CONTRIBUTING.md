# Contributing Guide

## Purpose

This project has a short delivery timeline. The contribution process is optimized for speed, clarity, and low integration risk.

## Core Expectations

- build in small slices
- keep work scoped to one concern
- use mocks when another module is not ready
- update documentation when a contract changes
- prefer merging small progress continuously over holding large branches

## Branch Naming

Use:

```text
feat/<area>-<short-name>
fix/<area>-<short-name>
docs/<topic>
chore/<topic>
test/<topic>
```

Examples:

- `feat/backend-telemetry-ingestion`
- `feat/frontend-dashboard-shell`
- `docs/api-contracts`

## Commit Format

Use conventional commits:

```text
feat: add telemetry validation schema
fix: prevent duplicate alert creation
docs: define simulator workflow
test: add latest-state endpoint tests
chore: add frontend ci workflow
```

## Pull Request Rules

- one logical change per PR
- keep PRs small
- include test steps
- include screenshots for UI changes
- include example payloads for API/contract changes
- state follow-up work clearly

## Stacked PR Rule

If a change depends on another in-progress PR:

- create a child branch from the parent branch
- keep the child PR small and focused
- mention the parent PR in the description

## Required Checks Before Merge

- relevant CI passes
- docs updated if needed
- at least one approval
- no unresolved critical review comments

## Review Priorities

Reviewers should prioritize:

1. correctness
2. integration risk
3. contract clarity
4. testability
5. code style

## Ownership Boundaries

- ECE: `hardware/`
- CSE: `backend/`, `scripts/`
- SE: `frontend-web/`, `mobile/`
- shared: `docs/`, `.github/`

Cross-team review is required for contract changes.

## Definition of Done

A change is done when:

- the change works locally or with mock data
- affected docs are updated
- the PR description is complete
- test evidence is included when relevant

