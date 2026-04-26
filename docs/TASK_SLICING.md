# Task Slicing Guide

This document shows how to break work into independent tasks that fit stacked PRs and parallel delivery.

## Slicing Rule

A good task:

- has one owner
- changes one layer or one contract
- can be reviewed independently
- has a visible outcome

## Bad Task Examples

- "build the whole backend"
- "make the UI"
- "do AI"

These are too large and unclear.

## Good Task Examples

### ECE

- define ESP32 payload shape for telemetry
- read fuel sensor and print calibrated value
- integrate GPS coordinates into packet
- send packet every 10 seconds

### CSE

- create telemetry validation schema
- implement `POST /api/telemetry`
- store latest vehicle state
- add suspicious fuel drop rule
- build simulator for normal-drive scenario

### SE

- create dashboard shell layout
- build vehicle latest status card
- build alerts table
- render telemetry history chart with mock data

## Suggested First Task Queue

### ECE Queue

1. payload sample definition
2. sensor read proof
3. GPS proof
4. packet assembly
5. transmission loop

### CSE Queue

1. repo backend skeleton
2. telemetry schema validator
3. ingestion endpoint
4. normalized storage
5. latest-state endpoint
6. alert rules
7. simulator

### SE Queue

1. screen inventory and routing
2. dashboard shell
3. vehicle latest state card with mock data
4. alerts panel with mock data
5. history page with mock data
6. API integration swap-in

## Integration-Safe Task Pattern

Preferred order:

1. define contract
2. create mock data
3. implement producer
4. implement consumer
5. integrate

## Maximum Task Size

If a task cannot be finished in 1 day or split into a small PR, it is too large and should be broken down.

