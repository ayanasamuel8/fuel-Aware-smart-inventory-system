# Execution Workflow

## Purpose

This document defines how the team works day to day so the project moves quickly without chaos.

## Working Model

The project should be run as a small monorepo with isolated modules and small stacked pull requests.

Recommended top-level structure:

```text
/docs
/hardware
/backend
/frontend-web
/mobile
/scripts
/.github
```

## Team Operating Rules

### 1. Small Vertical Changes

Every change should be small enough to review quickly and test independently.

Bad:

- one huge PR with UI, backend, hardware docs, and analytics mixed together

Good:

- one PR for telemetry schema
- one PR for backend ingestion
- one PR for dashboard latest-status card

### 2. Stacked PR Rule

Use stacked PRs when work depends on another change.

Example:

1. PR A: telemetry schema and docs
2. PR B: backend ingestion built on PR A
3. PR C: dashboard latest vehicle card built on PR B

Rules:

- each PR must remain small
- each PR must be understandable alone
- each PR must clearly state parent dependency
- reviewers should be able to approve progressively

### 3. Branch Naming

Use:

```text
feat/<area>-<short-name>
fix/<area>-<short-name>
docs/<topic>
chore/<topic>
```

Examples:

- `feat/backend-telemetry-ingestion`
- `feat/frontend-alert-panel`
- `docs/architecture-contracts`

### 4. Commit Rule

Use conventional commit style:

```text
feat: add telemetry ingestion endpoint
fix: handle stale device alerts correctly
docs: define stacked PR workflow
chore: add github actions for ci
refactor: split alert rules into module
test: add ingestion validation tests
```

Rules:

- one logical change per commit
- commit messages must explain intent
- avoid `update`, `changes`, `work`, `final`

### 5. Pull Request Rule

Every PR must include:

- what changed
- why it changed
- how to test it
- screenshots if UI changed
- API examples if contract changed
- linked task or issue

PR template sections:

- Summary
- Scope
- Test steps
- Risks
- Follow-up work

### 6. PR Size Rule

Target:

- under 300 changed lines when possible
- under 10 files when possible

Large PRs are allowed only when:

- generated files are excluded from review
- the team explicitly agrees

### 7. Review Rule

At least one reviewer from the relevant area:

- ECE reviews hardware-related changes
- CSE reviews backend/data/analytics changes
- SE reviews frontend/mobile/UI changes

Cross-team review is required when contracts are affected.

### 8. Definition of Ready

A task is ready only if:

- expected outcome is clear
- owner is clear
- dependency is known
- mock path exists if dependency is external
- acceptance criteria are written

### 9. Definition of Done

A task is done only if:

- code or artifact exists
- docs updated if contract changed
- tested locally or with simulator
- review completed
- no known critical bug left in that slice

## GitHub Rules

## Repository Protection

When the repo is created, enable:

- require pull request before merge
- require at least 1 approval
- prevent direct push to `main`
- require passing CI checks
- require branch up to date before merge if possible

## Labels

Recommended labels:

- `p0`
- `p1`
- `p2`
- `backend`
- `frontend`
- `mobile`
- `hardware`
- `docs`
- `blocked`
- `needs-review`
- `bug`

## Issue Templates

Use issue templates for:

- feature
- bug
- task
- integration blocker

Each issue should state:

- owner team
- priority
- acceptance criteria
- dependencies

## CI/CD Strategy

## CI Goals

CI must be fast and useful. Do not build a heavy pipeline that wastes time.

Minimum CI checks:

- lint
- test
- build
- docs link/markdown check if easy

### Backend CI

- install dependencies
- lint
- run unit tests
- optional build/typecheck

### Frontend CI

- install dependencies
- lint
- build
- test if available

### Mobile CI

- only if mobile is active in MVP

### Docs CI

- markdown lint optional
- broken link check optional

## CD Strategy

For prototype speed:

- auto-deploy preview per PR for web if possible
- manual deploy to demo environment for stable merges

Recommended:

- PR preview for frontend
- staging backend on merge to `main`

## Daily Execution Rhythm

### Daily Standup

Every day, answer only:

- what I finished
- what I will do next
- what blocks me

### Blocker Rule

If blocked for more than 30 minutes:

- document the blocker
- create mock fallback if possible
- ask for decision

Do not wait silently.

## Integration Workflow

### Contract Change Workflow

1. update docs first
2. notify affected teams
3. merge schema/contract PR
4. update implementations

### End-to-End Integration Rule

At least once per day:

- run simulator
- push telemetry through backend
- verify dashboard renders data

Even partial integration is better than postponing integration until the end.

## Release Workflow

Milestones:

1. skeleton setup
2. contracts stable
3. telemetry end to end
4. alerts end to end
5. history and dashboard stable
6. polish and demo preparation

## Decision-Making Rule

When time is tight, prefer:

- simpler implementation
- fewer features
- better demo stability

Do not choose complexity unless it clearly improves the demo.

