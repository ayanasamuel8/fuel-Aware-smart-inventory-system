# Demo Plan

This document ensures the final presentation is controlled and reliable.

## Demo Objective

Show a believable working prototype that solves a real logistics and fuel monitoring problem.

## Primary Demo Story

1. Show vehicle dashboard with current status
2. Explain live fuel and location telemetry
3. Simulate or show normal trip behavior
4. Trigger suspicious fuel drop event
5. Show alert generation
6. Show historical data and trip summary
7. Show simple operational insight or recommendation

## Recommended Demo Mode

Use the most reliable mode available:

### Option A

- live hardware feeding system

### Option B

- simulator feeding production-like backend

### Option C

- prerecorded telemetry replay

Always prepare B and C even if A is available.

## Demo Roles

- one narrator
- one operator driving the software
- one operator managing simulator or hardware
- one backup person for troubleshooting

## Evidence to Prepare

- screenshots of main screens
- payload logs
- architecture slide
- feature ownership slide
- one-minute fallback explanation if hardware is offline

## Live Demo Checklist

- internet checked
- environment variables checked
- demo user credentials checked
- backend running
- frontend reachable
- simulator/hardware tested
- fallback dataset ready

## Question Preparation

Prepare answers for:

- why Supabase was chosen
- why simulator was necessary
- how theft detection works
- how the system scales beyond one vehicle
- what each department contributed
