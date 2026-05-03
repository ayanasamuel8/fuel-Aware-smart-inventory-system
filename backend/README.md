# Fuel-Aware Backend

FastAPI backend bootstrap for the Fuel-Aware Smart Inventory System.

## Stack

- `uv` for Python package management
- FastAPI for the HTTP service
- `psycopg` for direct Supabase Postgres access

## Setup

1. Copy `.env.example` to `.env`
2. Fill in `SUPABASE_DB_URL`
3. Install dependencies:

```bash
uv sync
```

4. Start the API:

```bash
uv run uvicorn analytics.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /health`
- `GET /telemetry/sample?limit=10`

`/telemetry/sample` runs a direct `SELECT` against `telemetry_normalized` and returns a small result set for connectivity verification.

## Notes

- This backend uses `SUPABASE_DB_URL` rather than anonymous/service Supabase API keys because the task requires direct SQL access.
- The table name defaults to `telemetry_normalized` but can be overridden with `TELEMETRY_TABLE`.
